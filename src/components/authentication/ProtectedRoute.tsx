import { Navigate } from 'react-router';
import { ReactNode, useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  return <>{user ? children : <Navigate to='/landing' />}</>;
};

export default ProtectedRoute;
