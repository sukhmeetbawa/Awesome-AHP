from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_weight(A, str):
    n = A.shape[0]
    e_vals, e_vecs = np.linalg.eig(A)
    lamb = max(e_vals)
    w = e_vecs[:, e_vals.argmax()]
    w = w / np.sum(w)  # Normalization
    # Consistency Checking
    ri = {1: 0, 2: 0, 3: 0.58, 4: 0.9, 5: 1.12, 6: 1.24,
          7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49, 11: 1.51}
    ci = (lamb - n) / (n - 1)
    cr = ci / ri[n]
    print("The normalized eigen vector:")
    print(w)
    print('CR = %f' % cr)
    if cr >= 0.1:
        error_message = f"Failed Consistency check of {str}"
        print(error_message)
        return None, error_message

    return w, None

def calculate_ahp(A, B, n, m, criterions, alternatives):
    for i in range(0, n):
        for j in range(i, n):
            if i != j:
                A[j][i] = float(1/A[i][j])
    dfA = pd.DataFrame(A)

    for k in range(0, n):
        for i in range(0, m):
            for j in range(i, m):
                if i != j:
                    B[k][j][i] = float(1/B[k][i][j])
    for i in range(0, n):
        dfB = pd.DataFrame(B[i])
    
    W2, error_criterion = get_weight(A, "Criterion Table")
    if error_criterion:
        return None, None, error_criterion

    W3 = np.zeros((n, m))
    for i in range(0, n):
        w3, error_alternative = get_weight(B[i], f"Alternative Table for Criterion {criterions[i]}")
        if error_alternative:
            return None, None, error_alternative
        W3[i] = w3

    if W2 is None or np.any(W3 == None):
        return None, None, "Consistency check failed."

    W = np.dot(W2, W3)

    return W2.real.tolist(), W.real.tolist(), None


@app.route('/calculate_alternative_weights', methods=['POST'])
def calculate_alternative_weights():
    criteria_matrix = None
    alternatives_matrix = None
    criterions = None
    alternatives = None

    if request.json is not None:
        criteria_matrix = np.array(request.json.get('criteriaMatrix'))
        alternatives_matrix = np.array(request.json.get('alternativeMatrix'))
        criterions = request.json.get('criterions')
        alternatives = request.json.get('alternatives')

    if criteria_matrix is None:
        return jsonify({'error': 'Invalid input'})

    result_criterion_weights, result_alternative_weights, error_message = calculate_ahp(criteria_matrix, alternatives_matrix, len(criterions or []), len(alternatives or []), criterions or [], alternatives or [])
    return jsonify({'criterionWeights': result_criterion_weights, 'alternativeWeights': result_alternative_weights, 'error': error_message})

if __name__ == '__main__':
    app.run(port=5000)
