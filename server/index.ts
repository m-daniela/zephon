import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getConversations, getUsers } from "./database/get_data";
import { endpoints } from "./utils/constants";
import { register } from "./database/user_operations";
import { User } from "./types/user_types";
import { authenticateToken, generateAccessToken } from "./authentication/authenticate";
import { addConversation, addMessage } from "./database/add_data";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    await getUsers();
    res.send("server running...");
});

app.post("/auth", authenticateToken, async (req: Request, res: Response) => {
    // for testing purposes
    // await getUsers();
    // await addConversation(["a@mail.com"]);
    res.send("server running...");
});

app.post(endpoints.register, async (req: Request, res: Response) => {
    const userData: User = req.body as User;
    console.log("server", userData);
    const message = await register(userData);
    res.send(message);
});

app.post(endpoints.login, async (req: Request, res: Response) => {
    const email: string = req.body.email;
    console.log("server", email);
    const authToken = generateAccessToken(email);
    res.json({authToken});
});

app.post(endpoints.addConversation, authenticateToken, async (req: Request, res: Response) => {
    const conversationData = req.body;
    const conversation = await addConversation(conversationData);
    res.json(conversation);
});

app.post(endpoints.getConversations, authenticateToken, async (req: Request, res: Response) => {
    const email = req.body.email;
    const conversations = await getConversations(email);
    res.json(conversations);
});

app.post(endpoints.addMessage, authenticateToken, async (req: Request, res: Response) => {
    const messageData = req.body;
    const conversationId = req.params.conversationId;
    const message = await addMessage(conversationId, messageData);
    res.json(message);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});