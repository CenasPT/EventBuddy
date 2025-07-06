import { auth, database } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const signUp = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create a new user document in Firestore
  await setDoc(doc(database, "users", user.uid), {
    email: user.email,
    name: name ? name : "",
    favorites: [],
    participations: [],
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
