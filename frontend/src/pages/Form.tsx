import { useState } from "react";
import AlternativeForm from "./Form/AlternativeForm";
import BasicForm from "./Form/BasicForm";
import CriteriaForm from "./Form/CriteriaForm";
const Form = () => {
    const [step, setStep] = useState(1);
    const nextStep: () => void = () => {
        setStep(step + 1);
    };
    const prevStep: () => void = () => {
        setStep(step - 1);
    };
    switch (step) {
        case 1:
            return <BasicForm nextStep={nextStep} />;
        case 2:
            return <CriteriaForm prevStep={prevStep} nextStep={nextStep} />;
        case 3:
            return <AlternativeForm prevStep={prevStep} />;
        default:
            console.log("This is a multi-step form built with React.");
    }
};
export default Form;
