import { ReactNode } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type TProtectedRoute = {
  children: ReactNode;
  allowedRoles: string[];
};

//create a type for user
type TUser = {
  role?: string;
  name?: string;
  token?: string;  
}


const ProtectedRoute = ({ children, allowedRoles }: TProtectedRoute) => {
const { token, user, lastPath } = useAppSelector((state) => state.user);
const location = useLocation();
const navigate = useNavigate();

  if (!token) {
    toast.error('Please login to continue. You will be redirected to login page.You are not authorized to access the registration page.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // @ts-ignore
  if (!allowedRoles.includes(user?.role)) {
    toast.error('You are not authorized to access this page');
    return <Navigate to="/login" replace />;
  }

 
  return <>{children}</>;
};

export default ProtectedRoute;