import { db } from "./config";

export const getUsers = async () => {
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
};