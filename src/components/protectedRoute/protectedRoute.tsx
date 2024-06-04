import React from "react";
import { useSelector } from "react-redux";
import { Preloader } from "../ui";
import { Navigate, useLocation } from "react-router-dom"; 
import { selectIsAuthChecked, selectUser } from "../../services/slices/stellarBurgerSlice";

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
    const isAuthChecked = useSelector(selectIsAuthChecked); // селектор получения состояния загрузки пользователя
    const user = useSelector(selectUser); // селектор получения пользователя из store
    const location = useLocation();

    if (!isAuthChecked) {
        return <Preloader />;
    }
    
    if (!onlyUnAuth && !isAuthChecked) {
        return <Navigate replace to='/login' state={{ from: location }} />
    }

    if (onlyUnAuth && isAuthChecked) {
        const from  = location.state?.from || { pathname: '/' };
        return <Navigate replace to={from} />;
    }

    return children;
}