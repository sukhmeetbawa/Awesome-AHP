import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import AlternativesMatrix from "./components/AlternativeMatrix";
import BarGraph from "./components/BarGraph";
import CriteriaMatrix from "./components/CriteriaMatrix";

import "./App.css";
import ErrorToast from "./components/ErrorToast";

interface AHPResult {
    error: string | null;
    criterionWeights: number[];
    alternativeWeights: number[];
}

function App(): JSX.Element {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [criteria, setCriteria] = useState<string[]>([]);
    const [criteriaString, setCriteriaString] = useState<string>("");
    const [alternativeString, setAlternativeString] = useState<string>("");
    const [criteriaMatrix, setCriteriaMatrix] = useState<number[][]>([]);
    const [alternatives, setAlternatives] = useState<string[]>([]);
    const [alternativeMatrices, setAlternativeMatrices] = useState<
        number[][][]
    >([]);
    const [usecase, setUsecase] = useState<string>("");
    const [result, setResult] = useState<AHPResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);

    const [showErrorToast, setShowErrorToast] = useState(false);

    const criteriaAccordionRef = useRef<HTMLDivElement>(null);
    const alternativesAccordionRef = useRef<HTMLDivElement>(null);

    const handleCriteriaChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue === "") {
            setCriteria([]);
            return;
        }
        setCriteriaString(trimmedValue);
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
        setAlternativeString(trimmedValue);
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
                "Please enter at least 3 criteria and 3 alternatives.",
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
                (apiUrl || "http://localhost:5000") +
                    "/calculate_alternative_weights",
                {
                    criteriaMatrix: criteriaMatrix,
                    alternativeMatrix: alternativeMatrices,
                    criterions: criteria,
                    alternatives: alternatives,
                },
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

    const handleButtonPress = async () => {
        try {
            const response = await axios.post<string>(
                apiUrl || "http://localhost:5000" + "/open_ai_api",
                {
                    criterias: criteriaString,
                    alternatives: alternativeString,
                    usecase: usecase,
                    apikey: "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",
                },
            );

            console.log(response);
            setButtonPressed(true);
        } catch (error) {
            console.error("Error sending data:", error);
            showToast(); // Show error toast
        }
    };

    return (
        <div className="container mt-5 mb-5  col-sm-12">
            <div className="form-group">
                <h1
                    style={{ fontWeight: "bolder", fontSize: "4em" }}
                    className="text-center"
                >
                    AHP Calculator
                </h1>

                <div className="flex" style={{ alignItems: "center" }}>
                    <label htmlFor="criteriaInput">Enter the Criteria</label>
                    <input
                        type="text"
                        id="criteriaInput"
                        className="form-control"
                        placeholder="Safety, Comfort, Speed"
                        onChange={handleCriteriaChange}
                        disabled={buttonPressed}
                    />
                </div>
            </div>
            <div className="form-group mt-4">
                <label htmlFor="alternativesInput">
                    Enter the Alternatives
                </label>
                <input
                    type="text"
                    id="alternativesInput"
                    className="form-control"
                    placeholder="Mercedes, BMW, Audi"
                    onChange={handleAlternativeChange}
                    disabled={buttonPressed}
                />
            </div>
            <br />
            <div>
                <label htmlFor="promptInput">
                    Enter the use case for the AHP
                </label>
                <input
                    type="text"
                    id="promptInput"
                    className="form-control"
                    placeholder="What is the best car?"
                    onChange={(e) => setUsecase(e.target.value)}
                    disabled={buttonPressed}
                />
            </div>
            <br />
            <div className="text-center">
                <button
                    className="btn btn-success mt-3"
                    onClick={handleButtonPress}
                    disabled={buttonPressed}
                >
                    Generate Matrices
                </button>
            </div>
            {buttonPressed && (
                <>
                    <div className="accordion my-5" id="accordion">
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
                    <div className="text-center">
                        <button
                            className="btn btn-primary my-4"
                            onClick={calculateWeights}
                            disabled={
                                criteriaMatrix.length === 0 ||
                                alternativeMatrices.length === 0
                            }
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
                    </div>

                    {result && !result.error && (
                        <div className="mx-auto">
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
