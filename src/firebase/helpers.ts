import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, serverTimestamp, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { auth, firestore } from "./config";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  await createUserWithEmailAndPassword(auth, email, password);
  console.log(auth.currentUser);
  
  await setDoc(doc(firestore, "users", auth.currentUser.uid), {
    id: auth.currentUser?.uid,
    email: auth.currentUser?.email,
    name,
  });
};
export const loginUser = async (username: string, password: string) => {
  await signInWithEmailAndPassword(auth, username, password);
  /*  */
};

export const sendMessage = async (
  chatID: string,
  content: string,
  senderID: string,
  receiverID: string
) => {
  const db = getDatabase();

  await set(ref(db, "chats/" + chatID + "/" + new Date()), {
    content,
    senderID,
    receiverID,
    time: serverTimestamp(),
  });
};
