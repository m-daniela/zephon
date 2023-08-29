import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getUsers } from "./database/get_data";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
    await getUsers();
    res.send("server running...");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});