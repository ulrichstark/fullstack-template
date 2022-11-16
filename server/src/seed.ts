import { PrismaClient } from "@prisma/client";

(async () => {
    const prisma = new PrismaClient();

    await prisma.user.create({
        data: {
            id: "a1f78a66-3dc1-4648-86b6-05c4ff8ae719",
            name: "test",
            password: "$2b$10$tGNw1YllbsJ7Az7ZUfMhGuKt3uGAYkuWj4zpMic912aJrCyethNC.",
        },
    });
    await prisma.user.create({
        data: {
            id: "d0ba4c8f-2026-43e9-80a0-4174cc925c75",
            name: "admin",
            password: "$2b$10$4DNRmwEdG1c7nrYuv3qVze18cF7glT5hQc.Fv.wWdbckl5h3FxW02",
        },
    });
})();
