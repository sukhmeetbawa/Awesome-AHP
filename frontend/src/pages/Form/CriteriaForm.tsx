import NextIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import PairWiseComparison from "../../components/PairwiseComparison";
import StyledTable from "../../components/Table";
import "../../styles/Scrollbar.css";
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
    const [matrix, setMatrix] = useState<number[][]>(recievedMatrix);

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
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1">Criteria Details</Typography>
                    <Typography variant="h2">Criterion Comparison</Typography>
                </Grid>
                <Grid container item xs={9} className="classes.root">
                    <Box overflow="auto" maxHeight="320px" width="100%">
                        {criteria.map((item1, i) =>
                            criteria.slice(i + 1).map((item2, j) => (
                                <Grid
                                    item
                                    xs={12}
                                    key={`${item1}-${item2}`}
                                    width="95%"
                                >
                                    <PairWiseComparison
                                        item1={item1}
                                        item2={item2}
                                        onComparison={(value, selected) =>
                                            handleComparison(
                                                value,
                                                selected,
                                                i,
                                                j,
                                            )
                                        }
                                        defaultPriority={matrix[i][j + i + 1]}
                                    />
                                </Grid>
                            )),
                        )}
                    </Box>
                </Grid>
                <Grid
                    container
                    item
                    xs={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h4">Criteria Matrix</Typography>
                    <StyledTable
                        data={matrix}
                        rowHeaders={criteria}
                        columnHeaders={criteria}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={nextStep}
                        variant="contained"
                        endIcon={<NextIcon />}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default CriteriaForm;
