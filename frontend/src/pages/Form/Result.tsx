import BackIcon from "@mui/icons-material/NavigateBeforeRounded";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BarGraph from "../../components/Graph";

interface ResultProps {
    criteriaMatrix: number[][];
    alternativeMatrices: number[][][];
    criteria: string[];
    alternatives: string[];
    result: AHPResult;
    setResult: (result: AHPResult) => void;
    prevStep: () => void;
    resetStep: () => void;
    setStep: (step: number) => void;
    setError: (error: string) => void;
    usecase: string;
    consistency: boolean;
}

const Result: React.FC<ResultProps> = ({
    criteriaMatrix,
    alternativeMatrices,
    criteria,
    alternatives,
    result,
    setResult,
    prevStep,
    resetStep,
    setStep,
    setError,
    usecase,
    consistency,
}) => {
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
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
                    consistency: consistency,
                },
            );

            if (response.data.error) {
                setError(response.data.error);
                if (response.data.error === "Criterion Table") {
                    setStep(3);
                }
                const errorRegex = /Alternative Table/;
                if (errorRegex.test(response.data.error)) {
                    setStep(4);
                }
                setResult({
                    error: response.data.error,
                    criterionWeights: [],
                    alternativeWeights: [],
                });
                // console.log(response.data.error);
            } else {
                setResult(response.data);
            }
        } catch (error) {
            console.error("Error calculating weights:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        calculateWeights();
    }, []);

    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h2">Result</Typography>
            </Grid>
            {loading && (
                <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    height="70vh"
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading && result && !result.error && (
                <>
                    <Box
                        display="flex"
                        flexDirection="column"
                        minHeight="70vh"
                        alignContent="center"
                    >
                        <Box flexGrow={1}>
                            <Stack
                                paddingTop={4}
                                spacing={4}
                                width="50%"
                                margin="auto"
                            >
                                <BarGraph
                                    data={result?.alternativeWeights || []}
                                    labels={alternatives}
                                    label="Alternatives"
                                />
                                <BarGraph
                                    data={result?.criterionWeights || []}
                                    labels={criteria}
                                    label="Criteria"
                                />
                            </Stack>
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                style={{ minHeight: "10vh" }}
                            >
                                <Box
                                    display="flex"
                                    width="25%"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                    margin={3}
                                >
                                    <Typography variant="body1">
                                        For the usecase, <b>{usecase}</b> the
                                        highest priority criteria is{" "}
                                        <b>
                                            {
                                                criteria[
                                                    result.criterionWeights.indexOf(
                                                        Math.max(
                                                            ...result.criterionWeights,
                                                        ),
                                                    )
                                                ]
                                            }
                                        </b>{" "}
                                        and the most preferred alternative is{" "}
                                        <b>
                                            {
                                                alternatives[
                                                    result.alternativeWeights.indexOf(
                                                        Math.max(
                                                            ...result.alternativeWeights,
                                                        ),
                                                    )
                                                ]
                                            }
                                        </b>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs justifyContent="left" container>
                                    <Button
                                        variant="text"
                                        onClick={prevStep}
                                        startIcon={<BackIcon />}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs justifyContent="center" container>
                                    <Button
                                        variant="contained"
                                        onClick={resetStep}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item xs />
                            </Grid>
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

export default Result;
