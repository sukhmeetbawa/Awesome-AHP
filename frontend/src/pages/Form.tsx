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
            const response = {
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
            setCriteriaMatrix(parseAHPData(response).criteriaMatrix);
            setAlternativeMatrices(parseAHPData(response).alternativeMatrices);
            console.log("Matrices recieved from API");
            nextStep();
        } catch (error) {
            console.error("Error handling button press:", error);
        }
    };

    //Renderingd
    switch (step) {
        case 1:
            return (
                <BasicForm
                    nextStep={nextStep}
                    setCriteria={setCriteria}
                    setAlternatives={setAlternatives}
                    setUsecase={setUsecase}
                />
            );
        case 3:
            return (
                <CriteriaForm
                    nextStep={nextStep}
                    criteria={criteria}
                    updateMatrix={setCriteriaMatrix}
                    recievedMatrix={criteriaMatrix}
                />
            );
        case 4:
            return (
                <AlternativeForm
                    criteria={criteria}
                    alternatives={alternatives}
                    updateMatrix={setAlternativeMatrices}
                    recievedMatrix={alternativeMatrices}
                    nextStep={nextStep}
                />
            );
        case 5:
            return (
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
            );
        default:
            console.log("This is a multi-step form built with React.");
    }
};
export default Form;