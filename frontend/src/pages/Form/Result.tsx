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
    apiUrl?: string;
    result: AHPResult;
    setResult: (result: AHPResult) => void;
    prevStep: () => void;
    resetStep: () => void;
    setStep: (step: number) => void;
    setError: (error: string) => void;
}

const Result: React.FC<ResultProps> = ({
    criteriaMatrix,
    alternativeMatrices,
    criteria,
    alternatives,
    apiUrl,
    result,
    setResult,
    prevStep,
    resetStep,
    setStep,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

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
            {loading && (
                <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    height="75vh"
                >
                    <CircularProgress />
                </Box>
            )}
            <Grid>
                <Typography variant="h4">Result</Typography>
            </Grid>
            {!loading && result && !result.error && (
                <Stack paddingTop={4} spacing={4} width="50%" margin="auto">
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
            )}
            <Grid container justifyContent="center" alignItems="center">
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
                    <Button variant="contained" onClick={resetStep}>
                        Reset
                    </Button>
                </Grid>
                <Grid item xs />
            </Grid>
        </>
    );
};

export default Result;
