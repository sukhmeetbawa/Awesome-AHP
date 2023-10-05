import React, { useState, useRef } from "react";
import axios from "axios";
import AlternativesMatrix from "./components/AlternativeMatrix";
import CriteriaMatrix from "./components/CriteriaMatrix";
import BarGraph from "./components/BarGraph";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";
import ErrorToast from "./components/ErrorToast";

interface AHPResult {
    error: string | null;
    criterionWeights: number[];
    alternativeWeights: number[];
}

function App(): JSX.Element {
    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [alternativeMatrices, setAlternativeMatrices] = useState<
        number[][][]
    >([]);
    const [result, setResult] = useState<AHPResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);

    const [showErrorToast, setShowErrorToast] = useState(false);

    const criteriaAccordionRef = useRef<HTMLDivElement>(null);
    const alternativesAccordionRef = useRef<HTMLDivElement>(null);

    const handleCriteriaChange = (
        event: React.ChangeEvent<HTMLInputElement>
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
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue === "") {
            setAlternatives([]);
            return;
        }
        const alternativeArray = trimmedValue.split(",").filter(Boolean);

        setAlternatives(alternativeArray);
    };

    const updateCriteriaMatrix = (newMatrix: number[][]) => {
        setCriteriaMatrix(newMatrix);
    };

    const updateAlternativeMatrix = (newMatrix: number[][][]) => {
        setAlternativeMatrices(newMatrix);
    };

    const showToast = () => {
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 5000); // Hide the toast after 5 seconds
    };

    const calculateWeights = async () => {
        if (criteria.length < 3 || alternatives.length < 3) {
            console.error(
                "Please enter at least 3 criteria and 3 alternatives."
            );
            showToast(); // Show error toast
            return;
        }

        // Close both accordion sections
        criteriaAccordionRef.current?.classList.remove("show");
        alternativesAccordionRef.current?.classList.remove("show");

        setLoading(true);

        try {
            const response = await axios.post<AHPResult>(
                "http://localhost:5000/calculate_alternative_weights",
                {
                    criteriaMatrix: criteriaMatrix,
                    alternativeMatrix: alternativeMatrices,
                    criterions: criteria,
                    alternatives: alternatives,
                }
            );

            if (response.data.error) {
                setResult({
                    error: response.data.error,
                    criterionWeights: [],
                    alternativeWeights: [],
                });
                showToast(); // Show error toast
            } else {
                setResult(response.data);
            }
        } catch (error) {
            console.error("Error calculating weights:", error);
            showToast(); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    const handleButtonPress = () => {
        setButtonPressed(true);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="form-group">
                <label htmlFor="criteriaInput">Enter the Criteria</label>
                <input
                    type="text"
                    id="criteriaInput"
                    className="form-control"
                    placeholder="A, B, C"
                    onChange={handleCriteriaChange}
                    disabled={buttonPressed}
                />
            </div>
            <div className="form-group mt-4">
                <label htmlFor="alternativesInput">
                    Enter the Alternatives
                </label>
                <input
                    type="text"
                    id="alternativesInput"
                    className="form-control"
                    placeholder="X, Y, Z"
                    onChange={handleAlternativeChange}
                    disabled={buttonPressed}
                />
            </div>
            <button
                className="btn btn-success mt-3"
                onClick={handleButtonPress}
            >
                Generate Matrices
            </button>
            {buttonPressed && (
                <>
                    <div className="accordion my-5" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded={false}
                                    aria-controls="collapseOne"
                                >
                                    Criteria Values
                                </button>
                            </h2>
                            <div
                                ref={criteriaAccordionRef}
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    {criteria.length >= 3 && (
                                        <CriteriaMatrix
                                            n={criteria.length}
                                            criterias={criteria}
                                            updateMatrix={updateCriteriaMatrix}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded={false}
                                    aria-controls="collapseTwo"
                                >
                                    Alternative Values
                                </button>
                            </h2>
                            <div
                                ref={alternativesAccordionRef}
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    {alternatives.length >= 3 && (
                                        <AlternativesMatrix
                                            criterias={criteria}
                                            n={criteria.length}
                                            alternatives={alternatives}
                                            m={alternatives.length}
                                            updateMatrix={
                                                updateAlternativeMatrix
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary my-4"
                        onClick={calculateWeights}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{" "}
                                Calculating...
                            </>
                        ) : (
                            "Calculate"
                        )}
                    </button>

                    {result && !result.error && (
                        <div>
                            <BarGraph
                                data={result?.alternativeWeights || []}
                                labels={alternatives}
                                label="Alternatives"
                            />{" "}
                            <BarGraph
                                data={result?.criterionWeights || []}
                                labels={criteria}
                                label="Criteria"
                            />
                        </div>
                    )}
                </>
            )}

            <ErrorToast
                show={showErrorToast}
                onClose={() => setShowErrorToast(false)}
                error={result?.error ?? null}
            />
        </div>
    );
}

export default App;
