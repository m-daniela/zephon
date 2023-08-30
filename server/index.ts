import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getUsers } from "./database/get_data";
import { endpoints } from "./utils/constants";
import { register } from "./database/user_operations";
import { User } from "./types/user_types";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    await getUsers();
    res.send("server running...");
});

app.post(endpoints.register, async (req: Request, res: Response) => {
    const userData: User = req.body as User;
    console.log("server", userData);
    const message = await register(userData);
    res.send(message);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});