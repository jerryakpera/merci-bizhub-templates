import { Navigate } from 'react-router';
import { ReactNode, useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

type Props = {
  children: ReactNode;
};

const GuestRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  return <>{!user ? children : <Navigate to='/' />}</>;
};

export default GuestRoute;
