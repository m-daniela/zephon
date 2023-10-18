export const routes = {
    login: "/login", 
    register: "/register", 
    home: "/"
};

export const errorsToMessage: {
    [key: string]: string
} = {
    "auth/email-already-exists": "This email address is already in use.",
    "auth/email-already-in-use": "This email address is already in use.",
    "auth/user-not-found": "We could not find a user with this email.", 
    "auth/wrong-password": "Please make sure you have entered the correct password.", 
    "auth/matching-passwords": "Please make sure that the passwords match."
};

const url = "http://localhost:5000";

export const apiUrls = {
    register: `${url}/register`,
    login: `${url}/login`,
    getConversations: `${url}/conversations`, 
    addConversation: `${url}/conversation`,
    updateDeleteConversation: (conversationId: string) => `${url}/conversation/${conversationId}`
};