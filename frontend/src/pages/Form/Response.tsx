import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { parseAHPData } from "../../utils/parseAHPData";

interface ResponseProps {
    criteria: string[];
    alternatives: string[];
    usecase: string;
    setCriteriaMatrix: (criteriaMatrix: number[][]) => void;
    setAlternativeMatrices: (alternativeMatrices: number[][][]) => void;
    nextStep: () => void;
}

const Response: React.FC<ResponseProps> = ({
    criteria,
    alternatives,
    usecase,
    setCriteriaMatrix,
    setAlternativeMatrices,
    nextStep,
}) => {
    const apiKey = useCookies(["api_key"]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const [randomFact, setRandomFact] = useState<string>("");

    const getMatrices = async () => {
        try {
            console.log(
                `Sending request to API with criteria ${criteria} and alternatives ${alternatives} `,
            );
            // const response = await axios.post<string>(
            //     apiUrl || "http://localhost:5000" + "/open_ai_api",
            //     {
            //         criterias: criteria.join(","),
            //         alternatives: alternatives.join(","),
            //         usecase: usecase,
            //         apikey: apiKey[0].api_key,
            //     },
            //     {
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     },
            // );

            // const data = response.data;
            const data = {
                criteria_comparison: {
                    Safety: [1, 3, 5],
                    Comfort: [1 / 3, 1, 3],
                    Speed: [1 / 5, 1 / 3, 1],
                },
                alternative_comparison: {
                    "Criterion Safety": {
                        Mercedes: [1, 3, 5],
                        BMW: [1 / 3, 1, 3],
                        Audi: [1 / 5, 1 / 3, 1],
                    },
                    "Criterion Comfort": {
                        Mercedes: [1, 2, 4],
                        BMW: [1 / 2, 1, 2],
                        Audi: [1 / 4, 1 / 2, 1],
                    },
                    "Criterion Speed": {
                        Mercedes: [1, 1 / 3, 1 / 5],
                        BMW: [3, 1, 1 / 3],
                        Audi: [5, 3, 1],
                    },
                },
            };

            console.log(data);
            // const regex = /\{[\s\S]*\}$/;
            const { criteriaMatrix, alternativeMatrices } = parseAHPData(
                JSON.stringify(data),
            );
            setCriteriaMatrix(criteriaMatrix);
            setAlternativeMatrices(alternativeMatrices);

            console.log("Matrices recieved from API");

            setTimeout(() => {
                nextStep();
            }, 10000);
        } catch (error) {
            console.error("Error handling button press:", error);
        }
    };

    const Facts: string[] = [
        "AHP is a decision-making technique developed by Thomas Saaty in the 1970s.",
        "AHP is used to prioritize and make decisions in complex, multi-criteria situations.",
        "AHP uses pairwise comparisons to determine the relative importance of criteria and alternatives.",
        "AHP is widely applied in fields like project management, finance, and healthcare.",
        "Consistency in judgments is crucial in AHP to ensure reliable results.",
        "MCDM is a broader field that includes AHP and other methods for multi-criteria decision analysis.",
        "MCDM methods help decision-makers consider multiple criteria and conflicting objectives.",
        "TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) is a popular MCDM method.",
        "ELECTRE (Elimination Et Choix Traduisant la Realité) is another MCDM technique for sorting alternatives.",
        "Promethee is a MCDM method that ranks alternatives based on preference functions.",
        "AHP and MCDM can be applied to various decision scenarios, such as supplier selection and product design.",
        "MCDM aids in choosing the most suitable alternative when there are trade-offs between criteria.",
        "AHP and MCDM provide decision-makers with a systematic and structured approach to complex problems.",
        "In AHP, the eigenvalue method is used to calculate the principal eigenvector for weight determination.",
        "Sensitivity analysis is performed in AHP and MCDM to assess the robustness of the chosen solution.",
    ];

    useEffect(() => {
        getMatrices();
    }, []);

    useEffect(() => {
        let currentFactIndex = Math.floor(Math.random() * Facts.length);
        setRandomFact(Facts[currentFactIndex]);

        const intervalId = setInterval(() => {
            let nextFactIndex = currentFactIndex;
            while (nextFactIndex === currentFactIndex) {
                nextFactIndex = Math.floor(Math.random() * Facts.length);
            }

            setRandomFact(Facts[nextFactIndex]);
            currentFactIndex = nextFactIndex;
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Stack
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="75vh"
            spacing={4}
        >
            <CircularProgress />
            <Box width="50vh">
                <Typography variant="h5" textAlign="center">
                    {randomFact}
                </Typography>
            </Box>
        </Stack>
    );
};

export default Response;
