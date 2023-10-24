import NextIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState, version } from "react";
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
            <Grid 
                container 
                spacing={3}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h2">Criteria Details</Typography>
                    <Typography variant="h4">Criterion Comparison</Typography>
                </Grid>
                <Grid container item overflow="auto" maxHeight="480px">

                    <Grid item xs={2} />

                    <Grid container item xs={8} className="classes.root">
                        <Box width="100%">
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

                    <Grid item xs={2} />

                    <Grid item xs={3} />
                    <Grid
                        container
                        item
                        alignItems="center"
                        xs={6}
                    >

                        <Grid
                            container
                            item
                            justifyContent="center"
                            marginRight="30px"
                            marginTop="30px"
                        >
                            <Typography variant="h4">Criteria Matrix</Typography>
                            <StyledTable
                                data={matrix}
                                rowHeaders={criteria}
                                columnHeaders={criteria}
                            />
                        </Grid>

                    </Grid>
                    <Grid item xs={3} />


                </Grid>

                
                <Grid item>
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
