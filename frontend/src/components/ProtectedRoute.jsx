import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) return <Loader />;
  if (auth.isError || !auth.data) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;

