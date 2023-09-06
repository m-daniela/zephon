import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
} from "firebase/auth";
import { firebaseApp } from "./config";
import { FirebaseUser } from "../types/user_types";

const auth = getAuth(firebaseApp);

export const registerUser = async (
    email: string, password: string): Promise<FirebaseUser> => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response.user;
};


export const loginUser = async (
    email:string, password: string): Promise<FirebaseUser> => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
};
