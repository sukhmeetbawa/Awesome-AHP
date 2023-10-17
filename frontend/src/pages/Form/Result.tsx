import axios from "axios";

import { useEffect } from "react";
import BarGraph from "../../components/BarGraph";

interface ResultProps {
    criteriaMatrix: number[][];
    alternativeMatrices: number[][][];
    criteria: string[];
    alternatives: string[];
    apiUrl?: string;
    result: AHPResult;
    setResult: (result: AHPResult) => void;
}

const Result: React.FC<ResultProps> = ({
    criteriaMatrix,
    alternativeMatrices,
    criteria,
    alternatives,
    apiUrl,
    result,
    setResult,
}) => {
    const calculateWeights = async () => {
        try {
            const response = await axios.post<AHPResult>(
                (apiUrl || "http://localhost:5000") +
                    "/calculate_alternative_weights",
                {
                    criteriaMatrix: criteriaMatrix,
                    alternativeMatrix: alternativeMatrices,
                    criterions: criteria,
                    alternatives: alternatives,
                },
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
        } finally {
        }
    };
    useEffect(() => {
        calculateWeights();
    }, []);
    return (
        <div>
            {result && !result.error && (
                <div className="mx-auto">
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
};

export default Result;
