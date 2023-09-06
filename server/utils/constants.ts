import dotenv from "dotenv";
dotenv.config();

const url = process.env.URL;
console.log(url);

export const endpoints = {
    register: "/register",
    login: "/login",
};