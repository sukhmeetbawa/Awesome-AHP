import NextIcon from "@mui/icons-material/NavigateNextRounded";
import { Button, Grid, TextField, Typography } from "@mui/material";
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
        <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Typography variant="h2" style={{ textAlign: "center" }}>
                    Basic Details
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs />
                <Grid item xs={4}>
                    <Typography variant="h5">Criteria</Typography>
                    <TextField
                        size="small"
                        label="Enter the Criterias"
                        onChange={handleCriteriaChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs />
                <Grid item xs={4}>
                    <Typography variant="h5">Alternative</Typography>
                    <TextField
                        size="small"
                        label="Enter the Alternative"
                        onChange={handleAlternativeChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs />

                <Grid item xs={4}>
                    <Typography variant="h5">Usecase</Typography>
                    <TextField
                        size="small"
                        label="Enter the Usecase"
                        onChange={handleUsecaseChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid item xs>
                <br />
                <Button
                    onClick={nextStep}
                    variant="contained"
                    endIcon={<NextIcon />}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default BasicForm;
