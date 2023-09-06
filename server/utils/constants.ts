import dotenv from "dotenv";
dotenv.config();

const url = process.env.URL;
console.log(url);

export const endpoints = {
    // users
    register: "/register",
    login: "/login",
    // conversations
    addConversation: "/conversation", 
    getConversations: "/conversations",
    updateRemoveConversation: (conversationId: string) => `/conversation/${conversationId}`, 
};

export const firebasePaths = {
    // users
    users: "users",
    // conversations
    conversations: "conversations"
};