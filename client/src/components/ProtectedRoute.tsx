import { ReactNode } from "react";
import useGetUser from "../hooks/auth/useGetUser";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = useGetUser();
    
    if (user.isLoading) {
        return <Loader />;
    }

    if (user.isError) {
        return <Navigate to={"/"} replace/>
    }

    return <>{children}</>;
};

export default ProtectedRoute;
