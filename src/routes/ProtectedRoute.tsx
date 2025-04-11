import { ReactNode } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Navigate } from 'react-router-dom';
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
const { token, user } = useAppSelector((state) => state.user);

  if (!token) {
    toast.error('Please login to continue');
    return <Navigate to="/login" replace />;
  }

  // @ts-ignore
  if (!allowedRoles.includes(user?.role)) {
    toast.error('You are not authorized to access this page');
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;