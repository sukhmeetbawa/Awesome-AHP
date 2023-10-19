import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
        if (step === 2) {
            setAlternativeMatrices(() =>
                Array.from(Array(criteria.length), () =>
                    Array.from(Array(alternatives.length), () =>
                        new Array(alternatives.length).fill(1),
                    ),
                ),
            );
        }
    }, [step]);

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

            {step === 2 && (
                <CriteriaForm
                    nextStep={nextStep}
                    criteria={criteria}
                    updateMatrix={setCriteriaMatrix}
                    recievedMatrix={Array.from(Array(criteria.length), () =>
                        new Array(criteria.length).fill(1),
                    )}
                />
            )}

            {step === 3 && (
                <AlternativeForm
                    criteria={criteria}
                    alternatives={alternatives}
                    updateMatrix={setAlternativeMatrices}
                    nextStep={nextStep}
                    recievedMatrix={alternativeMatrices}
                />
            )}

            {step === 4 && (
                <Result
                    criteria={criteria}
                    alternatives={alternatives}
                    criteriaMatrix={criteriaMatrix}
                    alternativeMatrices={Array.from(
                        Array(criteria.length),
                        () =>
                            Array.from(Array(alternatives.length), () =>
                                new Array(alternatives.length).fill(1),
                            ),
                    )}
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
