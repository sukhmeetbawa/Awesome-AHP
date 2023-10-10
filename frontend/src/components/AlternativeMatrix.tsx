import React, { useState } from "react";
import PairWiseComparison from "./PairwiseComparison";
import Table from "./Table";

interface Props {
    n: number;
    m: number;
    criterias: string[];
    alternatives: string[];
    updateMatrix: (newMatrix: number[][][]) => void;
}

const AlternativesMatrix: React.FC<Props> = ({
    n,
    m,
    criterias,
    alternatives,
    updateMatrix,
}: Props) => {
    const [matrix, setMatrix] = useState(() =>
        Array.from(Array(n), () =>
            Array.from(Array(m), () => new Array(m).fill(1)),
        ),
    );

    const handleComparison = (
        value: number,
        selected: string,
        k: number,
        i: number,
        j: number,
    ) => {
        setMatrix((prevMatrix) => {
            const newMatrix = [...prevMatrix];

            if (selected === alternatives[i]) {
                newMatrix[k][i][j] = value;
                newMatrix[k][j][i] = 1 / value; // Fix the reciprocal assignment here
            } else {
                newMatrix[k][j][i] = value;
                newMatrix[k][i][j] = 1 / value; // Fix the reciprocal assignment here
            }
            updateMatrix(newMatrix);
            return newMatrix;
        });
    };

    return (
        <div>
            {criterias.map((criteria, k) => (
                <div key={criteria}>
                    <hr />
                    <h2>Alternative comparison for Criterion {criteria}</h2>
                    {alternatives.map((alternative1, i) =>
                        alternatives
                            .slice(i + 1)
                            .map((alternative2, j) => (
                                <PairWiseComparison
                                    key={`${alternative1}-${alternative2}`}
                                    item1={alternative1}
                                    item2={alternative2}
                                    onComparison={(value, selected) =>
                                        handleComparison(
                                            value,
                                            selected,
                                            k,
                                            i,
                                            j + i + 1,
                                        )
                                    }
                                />
                            )),
                    )}
                    <div key={`table-${criteria}`}>
                        <Table data={matrix[k]} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlternativesMatrix;
