import NextIcon from "@mui/icons-material/SkipNextRounded";
import BackIcon from "@mui/icons-material/SkipPreviousRounded";
import { Button, Typography } from "@mui/material";
interface CriteriaFormProps {
    prevStep: () => void;
    nextStep: () => void;
}
const CriteriaForm: React.FC<CriteriaFormProps> = ({ nextStep, prevStep }) => {
    return (
        <>
            <Typography variant="h1">Criteria Details</Typography>
            <Button
                variant="contained"
                startIcon={<BackIcon />}
                onClick={prevStep}
            >
                Back
            </Button>
            <Button
                onClick={nextStep}
                variant="contained"
                endIcon={<NextIcon />}
            >
                Next
            </Button>
        </>
    );
};

export default CriteriaForm;
