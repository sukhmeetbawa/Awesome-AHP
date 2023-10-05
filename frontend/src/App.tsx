import React, { useState } from "react";
import axios from "axios";
import AlternativesMatrix from "./components/AlternativeMatrix";
import CriteriaMatrix from "./components/CriteriaMatrix";
import BarGraph from "./components/BarGraph";

interface AHPResult {
    error: string | null;
    criterionWeights: number[];
    alternativeWeights: number[];
}

function App(): JSX.Element {
    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [alternativeMatrices, setAlternativeMatrices] = useState<
        number[][][]
    >([]);
    const [result, setResult] = useState<AHPResult | null>(null);

    const handleCriteriaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue === "") {
            setCriteria([]);
            return;
        }
        const criteriaArray = trimmedValue.split(",").filter(Boolean); // Filter out empty strings

        setCriteria(criteriaArray);
    };

    const handleAlternativeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue === "") {
            setAlternatives([]);
            return;
        }
        const alternativeArray = trimmedValue.split(",").filter(Boolean); // Filter out empty strings

        setAlternatives(alternativeArray);
    };

    const updateCriteriaMatrix = (newMatrix: number[][]) => {
        setCriteriaMatrix(newMatrix);
    };

    const updateAlternativeMatrix = (newMatrix: number[][][]) => {
        setAlternativeMatrices(newMatrix);
    };

    const calculateWeights = async () => {
        if (criteria.length < 3 || alternatives.length < 3) {
            console.error(
                "Please enter at least 3 criteria and 3 alternatives."
            );
            return;
        }

        try {
            const response = await axios.post<AHPResult>(
                "http://localhost:5000/calculate_alternative_weights",
                {
                    criteriaMatrix: criteriaMatrix,
                    alternativeMatrix: alternativeMatrices,
                    criterions: criteria,
                    alternatives: alternatives,
                }
            );

            if (response.data.error) {
                setResult({
                    error: response.data.error,
                    criterionWeights: [],
                    alternativeWeights: [],
                });
            } else {
                setResult(response.data);
            }
        } catch (error) {
            console.error("Error calculating weights:", error);
        }
    };

    return (
        <div>
            <div>
                <label>Enter the Criteria:</label>
                <input
                    type="text"
                    placeholder="A, B, C"
                    onChange={handleCriteriaChange}
                />
            </div>
            <div>
                <label>Enter the Alternatives:</label>
                <input
                    type="text"
                    placeholder="X, Y, Z"
                    onChange={handleAlternativeChange}
                />
            </div>
            <div>
                {criteria.length >= 3 && (
                    <CriteriaMatrix
                        n={criteria.length}
                        criterias={criteria}
                        updateMatrix={updateCriteriaMatrix}
                    />
                )}
            </div>
            <div>
                {alternatives.length >= 3 && (
                    <AlternativesMatrix
                        criterias={criteria}
                        n={criteria.length}
                        alternatives={alternatives}
                        m={alternatives.length}
                        updateMatrix={updateAlternativeMatrix}
                    />
                )}
            </div>
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
                    <BarGraph
                        data={result?.alternativeWeights || []}
                        labels={alternatives}
                        label="Alternatives"
                    />{" "}
                    <BarGraph
                        data={result?.criterionWeights || []}
                        labels={criteria}
                        label="Criteria"
                    />
                </div>
            )}
        </div>
    );
}

export default App;
