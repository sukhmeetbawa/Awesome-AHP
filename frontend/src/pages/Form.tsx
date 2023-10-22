import { Step, StepLabel, Stepper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { parseAHPData } from "../utils/parseAHPData";
import AlternativeForm from "./Form/AlternativeForm";
import BasicForm from "./Form/BasicForm";
import CriteriaForm from "./Form/CriteriaForm";
import Result from "./Form/Result";

const Form = () => {
    //Criteria
    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);

    //Alternative
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [alternativeMatrices, setAlternativeMatrices] = useState<
        number[][][]
    >([]);

    const steps = [
        "Basic Details",
        "Getting Input",
        "Criteria Details",
        "Alternative Details",
        "Result",
    ];

    //Usecase
    const [usecase, setUsecase] = useState<string>("");

    //Result
    const [result, setResult] = useState<AHPResult>();

    //Step Counter
    const [step, setStep] = useState(1);

    //API
    const apiKey = useCookies(["api_key"]);
    const apiUrl = import.meta.env.VITE_API_URL;

    //Functions
    const nextStep: () => void = () => {
        setStep(step + 1);
    };

    useEffect(() => {
        if (step === 2) getMatrices();
    }, [step]);

    const getMatrices = async () => {
        try {
            console.log(
                `Sending request to API with criteria ${criteria} and alternatives ${alternatives} `,
            );
            const response = await axios.post<string>(
                apiUrl || "http://localhost:5000" + "/open_ai_api",
                {
                    criterias: criteria.join(","),
                    alternatives: alternatives.join(","),
                    usecase: usecase,
                    apikey: apiKey[0].api_key,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            console.log(response.data);
            // const regex = /\{[\s\S]*\}$/;
            const { criteriaMatrix, alternativeMatrices } = parseAHPData(
                JSON.stringify(response.data),
            );
            setCriteriaMatrix(criteriaMatrix);
            setAlternativeMatrices(alternativeMatrices);
            console.log("Matrices recieved from API");
            nextStep();
        } catch (error) {
            console.error("Error handling button press:", error);
        }
    };

    //Renderingd
    return (
        <>
            <Stepper activeStep={step - 1} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {step === 1 && (
                <BasicForm
                    nextStep={nextStep}
                    setCriteria={setCriteria}
                    setAlternatives={setAlternatives}
                    setUsecase={setUsecase}
                />
            )}

            {step === 3 && (
                <CriteriaForm
                    nextStep={nextStep}
                    criteria={criteria}
                    updateMatrix={setCriteriaMatrix}
                    recievedMatrix={criteriaMatrix}
                />
            )}

            {step === 4 && (
                <AlternativeForm
                    criteria={criteria}
                    alternatives={alternatives}
                    updateMatrix={setAlternativeMatrices}
                    nextStep={nextStep}
                    recievedMatrix={alternativeMatrices}
                />
            )}

            {step === 5 && (
                <Result
                    criteria={criteria}
                    alternatives={alternatives}
                    criteriaMatrix={criteriaMatrix}
                    alternativeMatrices={alternativeMatrices}
                    result={
                        result || {
                            error: "",
                            criterionWeights: [],
                            alternativeWeights: [],
                        }
                    }
                    setResult={setResult}
                />
            )}
        </>
    );
};
export default Form;
