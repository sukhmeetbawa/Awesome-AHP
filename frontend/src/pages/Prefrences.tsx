import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { Button, Grid, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Preferences: React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["api_key"]);
    const [apiKey, setApiKey] = useState<string>(cookies.api_key || "");

    const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value);
    };

    const handleSaveClick = () => {
        setCookie("api_key", apiKey);
    };

    const handleResetClick = () => {
        removeCookie("api_key");
        setApiKey("");
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
                    Preferences
                </Typography>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs />
                <Grid item xs={4}>
                    <Typography variant="h5">API Key</Typography>
                    <TextField
                        size="small"
                        placeholder="Enter your API key"
                        label="API Key"
                        fullWidth
                        value={apiKey}
                        onChange={handleApiKeyChange}
                    />
                </Grid>
                <Grid item xs />
            </Grid>

            <Grid item xs>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveClick}
                    startIcon={<SaveRoundedIcon />}
                    style={{ marginRight: "16px" }}
                >
                    Save
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleResetClick}
                    startIcon={<RestoreRoundedIcon />}
                >
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
};

export default Preferences;
