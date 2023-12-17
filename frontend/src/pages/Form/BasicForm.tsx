import NextIcon from "@mui/icons-material/NavigateNextRounded";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
interface BasicFormProps {
    setCriteria: (criteria: string[]) => void;
    setAlternatives: (alternatives: string[]) => void;
    setUsecase: (usecase: string) => void;
    nextStep: () => void;
    criteria: string[];
    alternatives: string[];
    usecase: string;
    consistency: boolean;
    setConsistency: (consistency: boolean) => void;
    chatgpt: boolean;
    setChatGPT: (chatgpt: boolean) => void;
}
const BasicForm: React.FC<BasicFormProps> = ({
    nextStep,
    setAlternatives,
    setCriteria,
    setUsecase,
    criteria,
    alternatives,
    usecase,
    consistency,
    setConsistency,
    chatgpt,
    setChatGPT,
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

    const handleSubmit = () => {
        if (!criteria.length || !alternatives.length || !usecase) {
            alert("Please fill all the fields");
            return;
        } else if (criteria.length < 3 || alternatives.length < 3) {
            alert("Please enter atleast 3 criteria and alternatives");
            return;
        }
        nextStep();
    };

    const handleConsistencyChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setConsistency(event.target.checked);
    };

    const handleChatGPTChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setChatGPT(event.target.checked);
    };

    return (
        <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs>
                <Typography variant="h2" style={{ textAlign: "center" }}>
                    Basic Details
                </Typography>
            </Grid>
            <Grid container item xs>
                <Grid item xs />
                <Grid item xs>
                    <Typography variant="h5">Criteria</Typography>
                    <TextField
                        key="criteria"
                        size="small"
                        label="Enter the Criterias"
                        onChange={handleCriteriaChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid container item xs>
                <Grid item xs />
                <Grid item xs>
                    <Typography variant="h5">Alternative</Typography>
                    <TextField
                        key="alternative"
                        size="small"
                        label="Enter the Alternative"
                        onChange={handleAlternativeChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid item container xs>
                <Grid item xs />
                <Grid item xs>
                    <Typography variant="h5">Usecase</Typography>
                    <TextField
                        key="usecase"
                        size="small"
                        label="Enter the Usecase"
                        onChange={handleUsecaseChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid item container xs>
                <Grid item xs />
                <Grid item xs>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={consistency}
                                onChange={handleConsistencyChange}
                                color="primary"
                            />
                        }
                        label="Use Consistency Check for AHP Calculation"
                    />{" "}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={chatgpt}
                                onChange={handleChatGPTChange}
                                color="primary"
                            />
                        }
                        label="Use ChatGPT for generating values"
                    />{" "}
                </Grid>
                <Grid item xs />
            </Grid>
            <Grid item xs>
                <br />

                <Button
                    onClick={handleSubmit}
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
