import { User as FbUser } from "firebase/auth";

export interface User {
    email: string, 
    displayName: string,
    conversations?: string[]
}

export type FirebaseUser = FbUser;