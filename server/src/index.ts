import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/messages", async (req: Request, res: Response) => {
    const messages = await prisma.message.findMany();
    res.json(messages);
});

app.post("/messages", async (req: Request, res: Response) => {
    const { text } = req.body;
    const newMessage = await prisma.message.create({ data: { text: text, time: new Date() } });
    res.json(newMessage);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on :${process.env.PORT}`);
});
