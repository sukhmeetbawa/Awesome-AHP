import NextIcon from "@mui/icons-material/SkipNextRounded";
import BackIcon from "@mui/icons-material/SkipPreviousRounded";
import { Button, Typography } from "@mui/material";
interface AlternativeFormProps {
    prevStep: () => void;
}
const AlternativeForm: React.FC<AlternativeFormProps> = ({ prevStep }) => {
    return (
        <>
            <Typography variant="h1">Alternative Details</Typography>
            <Button
                variant="contained"
                startIcon={<BackIcon />}
                onClick={prevStep}
            >
                Back
            </Button>
            <Button disabled variant="contained" endIcon={<NextIcon />}>
                Next
            </Button>
        </>
    );
};

export default AlternativeForm;
