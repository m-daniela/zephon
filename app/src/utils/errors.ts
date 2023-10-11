
export class AuthError extends Error {
    constructor (message="Please log in to continue to this page."){
        super(message);
        this.name = "AuthError";
    }
}