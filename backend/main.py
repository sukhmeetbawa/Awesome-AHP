from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import openai
import os
from dotenv import load_dotenv

load_dotenv()

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


def generatePrompt(criteria, alternatives, usecase):

    criteria_list = criteria.split(',')
    alternatives_list = alternatives.split(',')

    print(criteria)
    print(alternatives)
    print(usecase)
    print(criteria_list)
    print(alternatives_list)

    prompt = "I am working on an AHP algorithm, \n"
    prompt += "i have use case of " + usecase + " \n" 
    prompt += "consider " + criteria + " as therir criteria \n"
    prompt += "consider " + alternatives + " as their alternatives \n\n"
    prompt += "write down values for priority establishment state based on educated guess \n"
    prompt += "values lies between value of 1 to 9 dont use decimal values for which priority is higher and use 1/value for which it has less priority \n here 1 is equal and 9 is has the most priority also tell me which value from two has higher priority \n\n"
    prompt += "- pairwise comparision of the criterias (Compare each criterias) \n"
    prompt += "create a criterian table with all " + str(len(criteria_list)) + " criteria comparision with each other \n"

    it1 = 0
    while it1 < len(criteria_list):
        it2 = it1 + 1
        while it2 < len(criteria_list):
            prompt += "     -> Criterion " + criteria_list[it1] + " comparision with Criterion " + criteria_list[it2] + "\n"
            it2 += 1
        it1 += 1

    prompt += "\n - pairwise comparision of the alternatives (Compare each alternatives) \n"
    prompt += "create a alternative table for each criterion with all " + str(len(alternatives_list)) + " alternatives comparision with each other \n"
    

    it1 = 0
    while it1 < len(criteria_list):
        prompt += "     -> Alternative comparision for Criterion " + criteria_list[it1] +  " (compare all " + str(len(criteria_list)) + " alternatives with each other ) \n"
        it1 += 1

    prompt += "\n write in Table format \n"
    prompt += "1 for the criteria and 1 for each alternative \n\n"
    prompt += "at the end write the all the tables combined in aa json format for easy access of data \n"
    prompt += "use the below given json format to generate answer \n\n"

    prompt += "{\n"
    prompt += "  \"criteria_comparison\": {\n"

    it1 = 0
    while it1 < len(criteria_list):
        prompt += "\"" + criteria_list[it1] + "\" : ["
        it2 = 0
        while it2 < len(criteria_list):
            prompt += "X"
            if(it2+1 < len(criteria_list)): prompt += ","
            it2 += 1
        prompt += "]"
        if(it1+1 < len(criteria_list)): prompt += ","
        prompt += "\n"
        it1 += 1
    
    prompt += "}, \n"
    prompt += " \"alternative_comparison\": { \n"
    
    it = 0
    while it < len(criteria_list):
        prompt += "\"Criterion " + criteria_list[it] + "\": { \n"
        
        it1 = 0
        while it1 < len(alternatives_list):
            prompt += "\"" + alternatives_list[it1] + "\" : ["
            it2 = 0
            while it2 < len(alternatives_list):
                prompt += "X"
                if(it2+1 < len(alternatives_list)): prompt += ","
                it2 += 1
            prompt += "]"
            if(it1+1 < len(alternatives_list)): prompt += ","
            prompt += "\n"
            it1 += 1

        prompt += "}"
        if(it+1 < len(criteria_list)): prompt += ","
        prompt += "\n"
        it += 1

    prompt += "}\n"
    prompt += "}\n"
    prompt += "\n\n maintain consistancy check for the values under 10 % \n"
    prompt += "i only want JSON output nothing more. Don't give me any text what so ever"


    return prompt


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


@app.route('/open_ai_api', methods=['GET'])
def open_ai_api():
    api_key = os.environ['API']
    openai.api_key = api_key

    criterias = request.args.get('criterias', default='', type=str)
    alternatives = request.args.get('alternatives', default='', type=str)
    usecase = request.args.get('usecase', default='', type=str)

    prompt = generatePrompt(criterias, alternatives, usecase)

    output = ""
    # output += "API Endpoint \n\n\n" + prompt + "\n\n\n"

    # Call the ChatGPT API using the correct endpoint for chat models
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are working on an AHP algorithm."},
            {"role": "user", "content": prompt},
        ],
    )

    # Extract the generated response
    output += response["choices"][0]["message"]["content"] # type: ignore

    # Print the result
    return output


if __name__ == '__main__':
    app.run(port=5000)
