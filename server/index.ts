import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getConversations, getMessages, getUsers } from "./database/get_data";
import { endpoints } from "./utils/constants";
import { register } from "./database/user_operations";
import { UserType } from "./types/user_types";
import { authenticateToken, generateAccessToken } from "./authentication/authenticate";
import { addConversation, addMessage } from "./database/add_data";
import { deleteConversationWrapper, deleteMessage } from "./database/delete_data";
import { updateConversation } from "./database/update_data";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    // for testing purposes
    const users = await getUsers();
    // res.send("server running...");
    res.json(users);
});

app.post("/auth", authenticateToken, async (req: Request, res: Response) => {
    // for testing purposes
    // await getUsers();
    // await addConversation(["a@mail.com"]);
    res.send("server running...");
});

app.post(endpoints.register, async (req: Request, res: Response) => {
    const userData: UserType = req.body as UserType;
    const message = await register(userData);
    if (message) {
        res.send(message);
    }
    const authToken = generateAccessToken(userData.email);
    res.send({authToken});
});

app.post(endpoints.login, async (req: Request, res: Response) => {
    const email: string = req.body.email;
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

app.delete(endpoints.updateDeleteConversation, authenticateToken, 
    async (req: Request, res: Response) => {
        const conversationId = req.params.conversationId;
        const removedConversation = await deleteConversationWrapper(conversationId);
        res.json(removedConversation);
    });

app.put(endpoints.updateDeleteConversation, authenticateToken, 
    async (req: Request, res: Response) => {
        const conversationId = req.params.conversationId;
        const conversationData = req.body;
        const conversation = await updateConversation(conversationId, conversationData);
        res.json(conversation);
    });

app.post(endpoints.addMessage, authenticateToken, async (req: Request, res: Response) => {
    const messageData = req.body;
    const conversationId = req.params.conversationId;
    const message = await addMessage(conversationId, messageData);
    res.json(message);
});

app.get(endpoints.getMessages, authenticateToken, async (req: Request, res: Response) => {
    const conversationId = req.params.conversationId;
    const messages = await getMessages(conversationId);
    res.json(messages);
});

app.delete(endpoints.deleteMessage, authenticateToken, async (req: Request, res: Response) => {
    const {conversationId, messageId} = req.params;
    const removedMessage = await deleteMessage(conversationId, messageId);
    res.json(removedMessage);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});