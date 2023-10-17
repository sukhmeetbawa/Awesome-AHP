import NextIcon from "@mui/icons-material/NavigateNextRounded";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import PairWiseComparison from "../../components/PairwiseComparison";
import Table from "../../components/Table";
interface AlternativeFormProps {
    criteria: string[];
    alternatives: string[];
    updateMatrix: (newMatrix: number[][][]) => void;
    recievedMatrix: number[][][];
    nextStep: () => void;
}
const AlternativeForm: React.FC<AlternativeFormProps> = ({
    criteria,
    alternatives,
    updateMatrix,
    recievedMatrix,
    nextStep,
}) => {
    const [matrix, setMatrix] = useState(() => recievedMatrix);

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
        <>
            <Typography variant="h1">Alternative Details</Typography>
            <div>
                {criteria.map((criterion, k) => (
                    <div key={criterion}>
                        <Typography variant="h3">
                            Alternative comparison for Criterion {criterion}
                        </Typography>
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
                                        defaultPriority={
                                            matrix[k][i][j + i + 1]
                                        }
                                    />
                                )),
                        )}
                        <div key={`table-${criterion}`}>
                            <Table
                                data={matrix[k]}
                                rowHeaders={alternatives}
                                columnHeaders={alternatives}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button
                variant="contained"
                onClick={nextStep}
                endIcon={<NextIcon />}
            >
                Calculate
            </Button>
        </>
    );
};

export default AlternativeForm;
