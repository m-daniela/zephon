import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../zephon_service_account.json";


initializeApp({
    credential: cert(serviceAccount as admin.ServiceAccount)
});
    
export const db = getFirestore();
