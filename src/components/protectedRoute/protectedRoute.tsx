import React, { useEffect } from 'react';
import { Preloader } from '../ui';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getUserThunk,
  selectIsAuthChecked,
  selectLoading
} from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isLoading = useSelector(selectLoading);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(getUserThunk());
    }
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
