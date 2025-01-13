import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return <Loader />;
  if (isError || !data) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
