import { test, expect } from "@playwright/test";

test("register, logout and login with random user", async ({ page }) => {
    await page.goto("/");

    const name = `user-${Math.round(Math.random() * 100000).toString()}`;
    const password = `password-${Math.round(Math.random() * 100000).toString()}`;

    // Home Screen
    await expect(page.getByRole("heading")).toHaveText("Home");
    await page.getByRole("link", { name: "Register" }).click();

    // Register Screen
    await expect(page.getByRole("heading")).toHaveText("Register");
    await page.getByRole("textbox", { name: "Name" }).fill(name);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Register" }).click(); // Register

    // Home Screen
    await expect(page.getByRole("heading")).toHaveText("Home");
    await expect(page.getByText(name)).toBeVisible();
    await page.getByRole("button", { name: "Logout" }).click(); // Logout
    await expect(page.getByText(name)).not.toBeVisible();
    await page.getByRole("link", { name: "Login" }).click();

    // Login Screen
    await expect(page.getByRole("heading")).toHaveText("Login");
    await page.getByRole("textbox", { name: "Name" }).fill(name);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click(); // Login

    // Home Screen
    await expect(page.getByRole("heading")).toHaveText("Home");
    await expect(page.getByText(name)).toBeVisible();
});
