import { User as FbUser } from "firebase/auth";

export type UserType = {
    email: string, 
    displayName: string,
    conversations?: string[]
}

export type FirebaseUserType = FbUser;