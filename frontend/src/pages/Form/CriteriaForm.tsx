import NextIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PairWiseComparison from "../../components/PairwiseComparison";
import Table from "../../components/Table";
interface CriteriaFormProps {
    nextStep: () => void;
    criteria: string[];
    updateMatrix: (criteria: number[][]) => void;
    recievedMatrix: number[][];
}
const CriteriaForm: React.FC<CriteriaFormProps> = ({
    nextStep,
    updateMatrix,
    criteria,
    recievedMatrix,
}) => {
    const [matrix, setMatrix] = useState(() => recievedMatrix);

    const handleComparison = (
        value: number,
        selected: string,
        i: number,
        j: number,
    ) => {
        setMatrix((prevMatrix: number[][]) => {
            const newMatrix = [...prevMatrix];
            if (selected === criteria[i]) {
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
        <Box margin={2}>
            <Typography variant="h1">Criteria Details</Typography>
            <Typography variant="h2">Criterion Comparison</Typography>
            <div>
                {criteria.map((item1, i) =>
                    criteria
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
                    <Table
                        data={matrix}
                        rowHeaders={criteria}
                        columnHeaders={criteria}
                    />
                </div>
            </div>

            <Button
                onClick={nextStep}
                variant="contained"
                endIcon={<NextIcon />}
            >
                Next
            </Button>
        </Box>
    );
};

export default CriteriaForm;
