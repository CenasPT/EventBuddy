import { database } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Get user data
export const getUserData = async (uid) => {
  const userRef = doc(database, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};

// Update favorites and participations in user data
export const updateUserData = async (uid, data) => {
  const userRef = doc(database, "users", uid);
  await updateDoc(userRef, data);
};
