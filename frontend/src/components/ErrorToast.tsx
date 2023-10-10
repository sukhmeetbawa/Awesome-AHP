import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface ErrorToastProps {
    show: boolean;
    onClose: () => void;
    error: string | null;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ show, onClose, error }) => {
    return (
        <ToastContainer position="bottom-center" className="p-3">
            <Toast
                onClose={onClose}
                show={show}
                delay={5000}
                autohide
                bg="warning"
            >
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                {error ? (
                    <Toast.Body>{error}</Toast.Body>
                ) : (
                    <Toast.Body>
                        Something went wrong. Please try again.
                    </Toast.Body>
                )}
            </Toast>
        </ToastContainer>
    );
};

export default ErrorToast;
