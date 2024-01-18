import { createContext, useContext, useState } from "react";
import { auth } from "../firebaseinit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
import db from "../firebaseinit";

const authContext = createContext();

//this function takes out main error from the returned error and return it back to show it in toast
function getError(error) {
  const err = error.message;
  const I1 = err.indexOf("/");
  const I2 = err.indexOf(")");
  return err.substring(I1 + 1, I2);
}

function Authentication({ children }) {
  const [SignedIn, setSignedIn] = useState(false);

  // this function is called inside signup function, whenever a new user sign ups, this function will create a new doc with new users ID as doc ID
  // and setting orders and cart to empty.
  const makeNewAccount = async (userCredential, name) => {
    await setDoc(doc(db, userCredential.user.uid, "Orders"), {
      name: name,
      myorders: [],
    });
    await setDoc(doc(db, userCredential.user.uid, "Cart"), {
      mycart: [],
    });
  };

  // function to signout the current signed in user
  const signOut = async () => {
    auth.signOut();
  };

  // function to handle signUp of new user using firebase authentication
  const signUp = async (N, E, P) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, E, P);
      console.log(userCredential);
      setSignedIn(true);
      makeNewAccount(userCredential, N);
      return "success";
    } catch (error) {
      const newErr = getError(error);
      return newErr;
    }
  };

  // function to handle SignIn, if user credentials are correct -> it will be signed it , else not.
  const signIn = async (e, p) => {
    try {
      await signInWithEmailAndPassword(auth, e, p);
      setSignedIn(true);
      return "success";
    } catch (error) {
      const newErr = getError(error);
      return newErr;
    }
  };

  return (
    <authContext.Provider
      value={{
        SignedIn,
        setSignedIn,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

//custom hook
function useValue() {
  const data = useContext(authContext);
  return data;
}

export { useValue };
export default Authentication;
