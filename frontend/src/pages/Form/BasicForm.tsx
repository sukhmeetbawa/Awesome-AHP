import NextIcon from "@mui/icons-material/SkipNextRounded";
import BackIcon from "@mui/icons-material/SkipPreviousRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
interface BasicFormProps {
    setCriteria: (criteria: string[]) => void;
    setAlternatives: (alternatives: string[]) => void;
    setUsecase: (usecase: string) => void;
    nextStep: () => void;
}
const BasicForm: React.FC<BasicFormProps> = ({
    nextStep,
    setAlternatives,
    setCriteria,
    setUsecase,
}) => {
    const handleCriteriaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue === "") {
            setCriteria([]);
            return;
        }
        const criteriaArray = trimmedValue.split(",").filter(Boolean);

        setCriteria(criteriaArray);
    };

    const handleAlternativeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue === "") {
            setAlternatives([]);
            return;
        }
        const alternativeArray = trimmedValue.split(",").filter(Boolean);

        setAlternatives(alternativeArray);
    };

    const handleUsecaseChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUsecase(event.target.value);
    };

    return (
        <Stack spacing={2} margin={2}>
            <Typography variant="h1">Basic Details</Typography>
            <div>
                <Typography variant="h2">Criteria</Typography>
                <TextField
                    size="small"
                    label="Enter the Criterias"
                    onChange={handleCriteriaChange}
                />
            </div>
            <div>
                <Typography variant="h2">Alternative</Typography>
                <TextField
                    size="small"
                    label="Enter the Alternative"
                    onChange={handleAlternativeChange}
                />
            </div>
            <div>
                <Typography variant="h2">Usecase</Typography>
                <TextField
                    size="small"
                    label="Enter the Usecase"
                    onChange={handleUsecaseChange}
                />
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
