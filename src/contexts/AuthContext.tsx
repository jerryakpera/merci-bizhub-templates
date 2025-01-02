import { createContext, useState, ReactNode, useEffect } from 'react';

import {
  User,
  getAuth,
  UserCredential,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth } from '../firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { login, register, signUserOut } from '@/firebase/auth';

type Props = {
  children: ReactNode;
};

type AuthContextProps = {
  user: FirebaseUser | null;
  signUserOut: () => Promise<void>;
  handleGoogleSignin: () => Promise<void>;
  setUser: (user: FirebaseUser | null) => void;
  register: (data: LoginData) => Promise<User | null>;
  login: (data: LoginData) => Promise<UserCredential>;
};

type LoginData = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login,
  register,
  signUserOut,
  setUser: () => {},
  handleGoogleSignin: async () => {
    throw new Error('handleGoogleSignin function not yet implemented');
  },
});

const handleGoogleSignin = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const AuthContextProvider = ({ children }: Props) => {
  const auth = getAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setLoading(false);

      setUser(currentUser ? currentUser : null);
    });

    return unsubscribe;
  }, [auth]);

  if (loading) {
    return null;
  }

  const contextValue: AuthContextProps = {
    user,
    login,
    setUser,
    register,
    signUserOut,
    handleGoogleSignin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
