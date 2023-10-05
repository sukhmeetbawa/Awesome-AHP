import React, { useState } from "react";

interface Props {
    item1: string;
    item2: string;
    onComparison: (value: number, selected: string) => void;
}

const PairWiseComparison: React.FC<Props> = ({
    item1,
    item2,
    onComparison,
}: Props) => {
    const [higher, setHigher] = useState<string>(item1);
    const [lower, setLower] = useState<string>(item2);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHigher(event.target.value);
        if (higher === item1) setLower(item1);
        else setLower(item2);
    };

    const [priority, setPriority] = useState<number>(1);
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setPriority(value);
        onComparison(value, higher);
    };

    return (
        <div style={{ margin: "1rem" }}>
            <div>
                <h4>{`${item1} comparison with ${item2}`}</h4>
                <p>Select the higher priority criterion</p>
                <label>
                    <input
                        className="form-check-input"
                        type="radio"
                        value={item1}
                        checked={higher === item1}
                        onChange={handleRadioChange}
                    />
                    {item1}
                </label>
                <label className="px-4">
                    <input
                        className="form-check-input"
                        type="radio"
                        value={item2}
                        checked={higher === item2}
                        onChange={handleRadioChange}
                    />
                    {item2}
                </label>
            </div>
            <p>
                How much higher is {higher} in comparison with {lower}?
            </p>
            <input
                className="form-range"
                type="range"
                min={1}
                max={9}
                value={priority}
                onChange={handleSliderChange}
            />
            <span>{priority}</span>
        </div>
    );
};

export default PairWiseComparison;
