// src/components/ErrorBoundary.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) {
      navigate("/not-found");
    }
  }, [hasError, navigate]);

  // Catch errors in the component tree below
  if (hasError) {
    return <h2>Redirecting to Not Found page...</h2>;
  }

  return (
    <React.ErrorBoundary
      fallbackRender={({ error }) => {
        setHasError(true);
        setError(error);
      }}
    >
      {children}
    </React.ErrorBoundary>
  );
};

export default ErrorBoundary;
