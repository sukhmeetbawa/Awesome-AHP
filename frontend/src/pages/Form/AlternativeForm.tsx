import NextIcon from "@mui/icons-material/NavigateNextRounded";
import { Box, Button, Grid, Typography } from "@mui/material";
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
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                <Grid item textAlign="center" xs={12}>
                    <Typography variant="h2">Alternative Details</Typography>
                    <br/>
                </Grid>

                <Grid container item overflow="auto" maxHeight="500px">

                    {criteria.map((criterion, k) => (

                        <Grid key={criterion} container >

                            <Grid item xs={12} textAlign="center">
                                <Typography variant="h4">
                                    Alternative comparison for Criterion{" "}
                                    {criterion}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <Grid container item className="classes.root">
                                    <Box

                                        width="100%"
                                    >
                                        {alternatives.map((alternative1, i) =>
                                            alternatives
                                                .slice(i + 1)
                                                .map((alternative2, j) => (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        key={`${alternative1}-${alternative2}`}
                                                        width="95%"
                                                    >
                                                        <PairWiseComparison
                                                            item1={alternative1}
                                                            item2={alternative2}
                                                            onComparison={(
                                                                value,
                                                                selected,
                                                            ) =>
                                                                handleComparison(
                                                                    value,
                                                                    selected,
                                                                    k,
                                                                    i,
                                                                    j + i + 1,
                                                                )
                                                            }
                                                            defaultPriority={
                                                                matrix[k][i][
                                                                j + i + 1
                                                                ]
                                                            }
                                                        />
                                                    </Grid>
                                                )),
                                        )}
                                    </Box>
                                </Grid>
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
                                    marginBottom="40px"
                                    key={`table-${criterion}`}
                                >
                                    <Typography variant="h4">
                                        Alternative Matrix
                                    </Typography>

                                    <Table
                                        data={matrix[k]}
                                        rowHeaders={alternatives}
                                        columnHeaders={alternatives}
                                    />
                                </Grid>


                            </Grid>



                            <Grid item xs={3} />
                        </Grid>
                    ))}
                </Grid>
                
                <br/>
                <Button
                    variant="contained"
                    onClick={nextStep}
                    endIcon={<NextIcon />}
                >
                    Calculate
                </Button>
            </Grid>
        </>
    );
};

export default AlternativeForm;
