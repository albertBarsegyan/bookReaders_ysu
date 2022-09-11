import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { StorageConstants } from "../constants/storage.constants";
import { actionCodeSettings } from "../libs/firebase/actionCodeSettings";
import { auth } from "../libs/firebase/firebaseConfig";
import { RegularPopupVariants } from "../types/componentVariants.types";
import { UserStage } from "../types/user.types";
import useStorage from "./useStorage.hooks";

interface IAuthContext {
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  user: UserStage | false;
  isAccessibleAuthApp: boolean;
  makeAccessToAuthApp: () => void;
}

type TResponse = { user: User };

const authContext = createContext<IAuthContext>({
  signIn: async (email: string, password: string) => {},
  signUp: async (email: string, password: string) => {},
  signOut: async () => {},
  user: null,
  isAccessibleAuthApp: false,
  makeAccessToAuthApp: () => {},
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<User | null | false>(null);
  const { saveDataToStorage } = useStorage();

  const {
    saveDataToStorage: saveDataToLocalStorage,
    getDataFromStorage: getDataFromLocalStorage,
  } = useStorage(localStorage);

  const accessFromLocalStorage = getDataFromLocalStorage(
    StorageConstants.isAccessible
  );

  const [isAccessibleAuthApp, setIsAccessibleAuthApp] = useState<boolean>(
    Boolean(accessFromLocalStorage)
  );

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: TResponse) => {
        const userUid = userCredential?.user?.uid;

        setUser(userCredential?.user);
        saveDataToStorage(StorageConstants.user, userUid);
        saveDataToLocalStorage(StorageConstants.user, userUid);
        return userCredential.user;
      })
      .catch(() => {
        return {
          popupVariant: RegularPopupVariants.DANGER,
          text: "Email or password are incorrect",
        };
      });
  };

  const makeAccessToAuthApp = () => {
    const access = true;
    setIsAccessibleAuthApp(access);
    saveDataToLocalStorage(StorageConstants.isAccessible, access);
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userUid = userCredential?.user?.uid;
        const user = userCredential.user;

        setUser(userCredential.user);
        saveDataToStorage(StorageConstants.user, userUid);
        saveDataToLocalStorage(StorageConstants.user, userUid);
        sendEmailVerification(user, actionCodeSettings);
        return {
          popupVariant: RegularPopupVariants.SUCCESS,
          text: "Successfully registered",
        };
      })
      .catch(() => {
        return {
          popupVariant: RegularPopupVariants.DANGER,
          text: "There is User with this email.",
        };
      });
  };

  const signOut = () => {
    return firebaseSignOut(auth)
      .then(() => {
        setUser(false);
        saveDataToStorage(StorageConstants.user, null);
        saveDataToLocalStorage(StorageConstants.isAccessible, null);
        saveDataToLocalStorage(StorageConstants.user, null);
        setIsAccessibleAuthApp(false);
        return false;
      })
      .catch((e) => {
        return e.message;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (iUser) => {
      if (iUser) {
        setUser(iUser);
        saveDataToStorage(StorageConstants.user, iUser?.uid);
        saveDataToLocalStorage(StorageConstants.user, iUser?.uid);
        return iUser;
      }

      setUser(false);
      saveDataToStorage(StorageConstants.user, null);
      saveDataToLocalStorage(StorageConstants.user, null);
      return null;
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [saveDataToLocalStorage, saveDataToStorage, user]);

  // Return the user object and auth methods
  return {
    user,
    isAccessibleAuthApp,
    makeAccessToAuthApp,
    signIn,
    signUp,
    signOut,
  };
}

interface IProvideAuthProps {
  children: JSX.Element | JSX.Element[];
}

export function ProvideAuth({ children }: IProvideAuthProps) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
