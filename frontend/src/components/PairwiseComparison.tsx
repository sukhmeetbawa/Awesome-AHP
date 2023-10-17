import {
    FormControlLabel,
    Radio,
    RadioGroup,
    Slider,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
    item1: string;
    item2: string;
    onComparison: (value: number, selected: string) => void;
    defaultPriority: number;
}

const PairWiseComparison: React.FC<Props> = ({
    item1,
    item2,
    onComparison,
    defaultPriority,
}: Props) => {
    const [higher, setHigher] = useState<string>(item1);
    const [lower, setLower] = useState<string>(item2);

    useEffect(() => {
        // Update default values if defaultPriority is less than 1
        if (defaultPriority && defaultPriority < 1) {
            setHigher(item2);
            setLower(item1);
            setPriority(1 / defaultPriority);
            onComparison(1 / defaultPriority, item2);
        }
    }, [defaultPriority]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHigher(event.target.value);
        if (higher === item1) setLower(item1);
        else setLower(item2);
    };

    const [priority, setPriority] = useState<number>(defaultPriority || 1);
    const handleSliderChange = (_: Event, value: number | number[]) => {
        if (typeof value === "number") {
            setPriority(value);
            onComparison(value, higher);
        }
    };

    return (
        <div>
            <div>
                <Typography variant="h4">
                    {`${item1} comparison with ${item2}`}
                </Typography>
                <Typography variant="body1">
                    Select the higher priority criterion
                </Typography>
                <RadioGroup row value={higher} onChange={handleRadioChange}>
                    <FormControlLabel
                        value={item1}
                        control={<Radio />}
                        label={item1}
                    />
                    <FormControlLabel
                        value={item2}
                        control={<Radio />}
                        label={item2}
                    />
                </RadioGroup>
            </div>
            <Typography variant="body1">
                How much higher is {higher} in comparison with {lower}?
            </Typography>
            <Slider
                value={priority}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={9}
            />
        </div>
    );
};

export default PairWiseComparison;
