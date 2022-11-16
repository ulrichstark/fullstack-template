import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/user/register", async (req: Request, res: Response) => {
    let { name, password } = req.body;

    if (!name || !password) {
        res.status(400);
        res.send(`'name' and 'password' not supplied`);
        return;
    }

    name = name.trim();
    password = password.trim();

    const userWithSameName = await prisma.user.findFirst({ where: { name: name } });
    if (userWithSameName) {
        res.status(400);
        res.send(`User '${name}' already exists`);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { name: name, password: hashedPassword } });

    res.send(`User '${newUser.name}' registered with ID ${newUser.id}`);
});

app.post("/user/login", async (req: Request, res: Response) => {
    let { name, password } = req.body;

    if (!name || !password) {
        res.status(400);
        res.send(`'name' and 'password' not supplied`);
        return;
    }

    name = name.trim();
    password = password.trim();

    const user = await prisma.user.findFirst({ where: { name: name } });
    const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

    if (!passwordMatches) {
        res.status(400);
        res.send(`Name does not match password`);
        return;
    }

    res.send(`User '${name}' logged in`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on :${process.env.PORT}`);
});
