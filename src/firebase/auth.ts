import {
  getAuth,
  signOut,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

type LoginData = {
  email: string;
  password: string;
};
type LoginResult = Promise<UserCredential>;

const auth = getAuth();

export const signOutUser = () => signOut(auth);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signUserOut = async () => {
  await signOut(auth);
};

export const login = async ({ email, password }: LoginData): LoginResult => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async ({ email, password }: LoginData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};
