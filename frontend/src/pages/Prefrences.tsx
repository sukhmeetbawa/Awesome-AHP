import { Button, Stack, TextField, Typography } from "@mui/material";

const Preferences = () => {
    return (
        <Stack spacing={2} margin={2}>
            <Typography variant="h5">Preferences</Typography>
            <Typography variant="h5">API Key</Typography>
            <TextField
                size="small"
                placeholder="Enter your API key"
                label="API Key"
            />

            <div>
                <Button variant="contained" color="primary">
                    Save
                </Button>
            </div>
        </Stack>
    );
};

export default Preferences;
