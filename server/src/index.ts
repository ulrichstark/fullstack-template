import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", (req: Request, res: Response) => {
    const { name } = req.body;

    res.json({ text: `Hey ${name} :)` });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on :${process.env.PORT}`);
});
