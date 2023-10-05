import React, { useState } from "react";
import PairWiseComparison from "./PairwiseComparison";
import Table from "./Table";

interface Props {
    n: number;
    criterias: string[];
    updateMatrix: (newMatrix: number[][]) => void;
}

const CriteriaMatrix: React.FC<Props> = ({
    n,
    criterias,
    updateMatrix,
}: Props) => {
    const [matrix, setMatrix] = useState(() =>
        Array.from(Array(n), () => new Array(n).fill(1))
    );

    const handleComparison = (
        value: number,
        selected: string,
        i: number,
        j: number
    ) => {
        setMatrix((prevMatrix) => {
            const newMatrix = [...prevMatrix];
            if (selected === criterias[i]) {
                newMatrix[i][j + i + 1] = value;
                newMatrix[j + i + 1][i] = 1 / value;
            } else {
                newMatrix[j + i + 1][i] = value;
                newMatrix[i][j + i + 1] = 1 / value;
            }
            updateMatrix(newMatrix);
            return newMatrix;
        });
    };

    if (matrix.every((row) => row.every((cell) => cell === undefined))) {
        for (let i = 0; i < n; i++) {
            matrix[i] = new Array(n); // Initialize each row separately
            for (let j = i; j < n; j++) {
                if (i === j) {
                    matrix[i][j] = 1;
                }
            }
        }
    }

    return (
        <div>
            {criterias.map((item1, i) =>
                criterias
                    .slice(i + 1)
                    .map((item2, j) => (
                        <PairWiseComparison
                            key={`${item1}-${item2}`}
                            item1={item1}
                            item2={item2}
                            onComparison={(value, selected) =>
                                handleComparison(value, selected, i, j)
                            }
                        />
                    ))
            )}
            <div>
                <Table data={matrix} />
            </div>
        </div>
    );
};

export default CriteriaMatrix;
