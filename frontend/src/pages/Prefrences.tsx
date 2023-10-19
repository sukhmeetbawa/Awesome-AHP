import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { Button, Stack, TextField, Typography } from "@mui/material";

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
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h5">Preferences</Typography>
            <Typography variant="h5">API Key</Typography>
            <TextField
                size="small"
                placeholder="Enter your API key"
                label="API Key"
                value={apiKey}
                onChange={handleApiKeyChange}
            />

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveClick}
                    startIcon={<SaveRoundedIcon />}
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
            </div>
        </Stack>
    );
};

export default Preferences;
