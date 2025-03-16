/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getLastPath } from "../redux/features/user/userSlice";

// type TUser = { username: string; role: string; iat: number; exp: number };

// Protected routes
const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.user.token);
  const user: any = useAppSelector((state) => state.user.user);

  // getting current time in the milliseconds

  const currentTime = Math.floor(Date.now() / 1000);

  const location = useLocation();
  const dispatch = useAppDispatch();

  // the main user authentication checking logic
  if (!token || currentTime > user.exp) {
    dispatch(getLastPath(location.pathname));
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
