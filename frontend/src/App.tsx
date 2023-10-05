import { useState } from "react";
import axios from "axios";

interface AHPResult {
    criterionWeights: number[];
    alternativeWeights: number[];
    error?: string; // Assuming the server returns an error message
}

function App(): JSX.Element {
    const [result, setResult] = useState<AHPResult | null>(null);

    const calculateWeights = async () => {
        const criterions: string[] = ["A", "B", "C"];
        const alternatives: string[] = ["X", "Y", "Z"];
        const alternativeMatrix: number[][][] = [
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ],
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ],
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ],
        ];
        const criterionMatrix: number[][] = [
            [1, 3, 5],
            [1 / 3, 1, 2],
            [1 / 5, 1 / 2, 1],
        ];

        try {
            const response = await axios.post<AHPResult>(
                "http://localhost:5000/calculate_alternative_weights",
                {
                    criteriaMatrix: criterionMatrix,
                    alternativeMatrix: alternativeMatrix,
                    criterions: criterions,
                    alternatives: alternatives,
                }
            );

            if (response.data.error) {
                // Display error message if consistency check fails
                setResult({
                    error: response.data.error,
                    criterionWeights: [],
                    alternativeWeights: [],
                });
            } else {
                // Set result if no error
                setResult(response.data);
            }
        } catch (error) {
            console.error("Error calculating weights:", error);
        }
    };

    return (
        <div>
            <button onClick={calculateWeights}>Calculate Weights</button>
            {result && result.error && <p>Error: {result.error}</p>}
            {result && !result.error && (
                <div>
                    <p>
                        Criterion Weights: {result.criterionWeights.join(", ")}
                    </p>
                    <p>
                        Alternative Weights:{" "}
                        {result.alternativeWeights.join(", ")}
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
