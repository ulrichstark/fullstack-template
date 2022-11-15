import { PrismaClient } from "@prisma/client";

(async () => {
    const prisma = new PrismaClient();

    await prisma.message.create({ data: { text: "Hey", time: "2022-11-15T20:45:57.468Z" } });
    await prisma.message.create({ data: { text: "What's up?", time: "2022-11-15T20:51:32.205Z" } });
})();
