import React, { useState } from "react";
import PairWiseComparison from "./PairwiseComparison";
import Table from "./Table";

interface Props {
    criterias: string[];
    updateMatrix: (newMatrix: number[][]) => void;
    recieverMatrix: number[][];
}

const CriteriaMatrix: React.FC<Props> = ({
    criterias,
    updateMatrix,
    recieverMatrix,
}: Props) => {
    const [matrix, setMatrix] = useState(() => recieverMatrix);

    const handleComparison = (
        value: number,
        selected: string,
        i: number,
        j: number,
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
                            defaultPriority={matrix[i][j + i + 1]}
                        />
                    )),
            )}
            <div>
                <Table data={matrix} />
            </div>
        </div>
    );
};

export default CriteriaMatrix;
