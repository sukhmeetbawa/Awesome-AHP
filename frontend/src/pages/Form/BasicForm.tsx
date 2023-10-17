import NextIcon from "@mui/icons-material/SkipNextRounded";
import BackIcon from "@mui/icons-material/SkipPreviousRounded";
import { Button, Typography } from "@mui/material";
interface BasicFormProps {
    nextStep: () => void;
}
const BasicForm: React.FC<BasicFormProps> = ({ nextStep }) => {
    return (
        <>
            <Typography variant="h1">Basic Details</Typography>
            <Button variant="contained" startIcon={<BackIcon />} disabled>
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

export default BasicForm;
