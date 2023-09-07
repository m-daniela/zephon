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
    updateDeleteConversation: "/conversation/:conversationId", 
    // messages
    addMessage: "/conversation/:conversationId/message", 
    getMessages: "/conversation/:conversationId/messages", 
    deleteMessage: "/conversation/:conversationId/message/:messageId", 
};

export const firebasePaths = {
    // users
    users: "users",
    // conversations
    conversations: "conversations",
    // messages
    messages: (conversationId: string) => `conversations/${conversationId}/messages`
};