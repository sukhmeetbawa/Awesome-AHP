import NextIcon from "@mui/icons-material/SkipNextRounded";
import BackIcon from "@mui/icons-material/SkipPreviousRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
interface BasicFormProps {
    nextStep: () => void;
}
const BasicForm: React.FC<BasicFormProps> = ({ nextStep }) => {
    return (
        <Stack spacing={2} margin={2}>
            <Typography variant="h1">Basic Details</Typography>
            <div>
                <Typography variant="h2">Criteria</Typography>
                <TextField size="small" label="Enter the Criterias" />
            </div>
            <div>
                <Typography variant="h2">Alternative</Typography>
                <TextField size="small" label="Enter the Alternative" />
            </div>
            <div>
                <Typography variant="h2">Usecase</Typography>
                <TextField size="small" label="Enter the Usecase" />
            </div>
            <div>
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
            </div>
        </Stack>
    );
};

export default BasicForm;
