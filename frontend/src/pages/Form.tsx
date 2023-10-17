import { useEffect, useState } from "react";
import { parseAHPData } from "../utils/parseAHPData";
import AlternativeForm from "./Form/AlternativeForm";
import BasicForm from "./Form/BasicForm";
import CriteriaForm from "./Form/CriteriaForm";

const Form = () => {
    const response = {
        criteria_comparison: {
            Safety: [1, 3, 2],
            Comfort: [1 / 3, 1, 1 / 2],
            Speed: [1 / 2, 2, 1],
        },
        alternative_comparison: {
            "Criterion Safety": {
                Mercedes: [1, 1 / 3, 1 / 2],
                BMW: [3, 1, 2],
                Audi: [2, 1 / 2, 1],
            },
            "Criterion Comfort": {
                Mercedes: [1, 1 / 3, 1 / 2],
                BMW: [3, 1, 2],
                Audi: [2, 1 / 2, 1],
            },
            "Criterion Speed": {
                Mercedes: [1, 1 / 2, 1],
                BMW: [2, 1, 3],
                Audi: [1 / 2, 1 / 3, 1],
            },
        },
    };

    //Criteria
    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>(
        parseAHPData(response).criteriaMatrix,
    );

    //Alternative
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [alternativeMatrices, setAlternativeMatrices] = useState<
        number[][][]
    >(parseAHPData(response).alternativeMatrices);

    //Usecase
    const [usecase, setUsecase] = useState<string>("");

    //Step Counter
    const [step, setStep] = useState(1);

    //Functions
    const nextStep: () => void = () => {
        setStep(step + 1);
    };

    //Debugging
    useEffect(() => {
        console.log("Criteria: ", criteria);
        console.log("Alternatives: ", alternatives);
        console.log("Usecase: ", usecase);
        console.log("Criteria Matrix: ", criteriaMatrix);
        console.log("Alternative Matrices: ", alternativeMatrices);
    }, [criteria, alternatives, usecase, criteriaMatrix, alternativeMatrices]);

    //Rendering
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
        case 2:
            return (
                <CriteriaForm
                    nextStep={nextStep}
                    criteria={criteria}
                    updateMatrix={setCriteriaMatrix}
                    recievedMatrix={criteriaMatrix}
                />
            );
        case 3:
            return (
                <AlternativeForm
                    criteria={criteria}
                    alternatives={alternatives}
                    updateMatrix={setAlternativeMatrices}
                    recievedMatrix={alternativeMatrices}
                />
            );
        default:
            console.log("This is a multi-step form built with React.");
    }
};
export default Form;
