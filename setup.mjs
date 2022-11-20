import { copyFileSync } from "fs";
import { execSync } from "child_process";

function execute(command, directory) {
    execSync(command, { cwd: directory, stdio: "inherit" });
}

for (const directory of ["client", "server", "tests"]) {
    const src = `${directory}/.env-sample`;
    const dest = `${directory}/.env`;

    copyFileSync(src, dest);
    console.log(src, "copied to", dest);

    execute("yarn", directory);
}

execute("npx prisma migrate dev", "server");
execute("npx playwright install", "tests");
