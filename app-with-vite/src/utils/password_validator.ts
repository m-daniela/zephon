/**
 * Simple password validator using regex
 * This checks if the password has:
 * - a minimum length of MIN_LEN
 * - at least one lowercase character 
 * - at least one uppercase character 
 * - at least one number 
 * - at least one special character (symbol)
 * If any of these conditions is not satisfied, 
 * a message is set on the instance so it can 
 * be displayed in the form
 */
export class PasswordValidator {
    message: string;
    password: string;
    MIN_LEN = 6;

    constructor() {
        this.password = "";
        this.message = "";
    }

    set = (password: string) => {
        this.password = password;
    };

    getValidationMessage = () => {
        return this.message;
    };

    minLength = () => {
        if (this.password.length < this.MIN_LEN) {
            this.message = `The password should be at least ${this.MIN_LEN} characters long.`;
        }
        return this;
    };

    lowercase = () => {
        const lowercaseRe = /[a-z]/;
        if (!lowercaseRe.test(this.password)){
            this.message = "The password should have at least 1 lowercase character.";
        }
        return this;
    };

    uppercase = () => {
        const lowercaseRe = /[A-Z]/;
        if (!lowercaseRe.test(this.password)){
            this.message = "The password should have at least 1 uppercase character.";
        }
        return this;
    };

    hasNumbers = () => {
        const lowercaseRe = /[0-9]/;
        if (!lowercaseRe.test(this.password)){
            this.message = "The password should have at least 1 number character.";
        }
        return this;
    };

    hasSymbols = () => {
        const lowercaseRe = /[^a-zA-Z0-9]/;
        if (!lowercaseRe.test(this.password)){
            this.message = "The password should have at least 1 special character.";
        }
        return this;
    };

    validate = (password: string) => {
        this.set(password);
        this
            .hasSymbols()
            .hasNumbers()
            .uppercase()
            .lowercase()
            .minLength();
        return this;
    };
}