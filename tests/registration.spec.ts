const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("load");
});

test("register a new user", async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  const currentTime = new Date();
  const timeString = currentTime.toLocaleTimeString().replace(/:/g, "-");
  await page.waitForSelector('input[name="name"]');
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill(
    'input[id="signupEmail"]',
    `john.doe_${timeString}@example.com`
  );
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeEnabled();

  await page.click('button:text("Register")');
  await expect(page).toHaveURL(/garage/);
  await page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Registration complete");
  });
});

test('"Name": Name required', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await expect
    .soft(page.locator(".invalid-feedback"))
    .toHaveText("Name required");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test('"Name": Name is invalid', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', " ");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await page.locator("Name is invalid");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test(' "Name": Name has to be from 2 to 20 characters long', async ({
  page,
}) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "q");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await page.locator("Name has to be from 2 to 20 characters long");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test(' "Last Name": Last Name required', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await expect
    .soft(page.locator(".invalid-feedback"))
    .toHaveText("Last name required");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test('"Last Name": Last Name is invalid', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', " ");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await page.locator("Last Name is invalid");
});

test('"Last Name": Last Name has to be from 2 to 20 characters long', async ({
  page,
}) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "q");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await page.locator("Last Name has to be from 2 to 20 characters long");
});

test('Empty field "Email": Email required', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await expect
    .soft(page.locator(".invalid-feedback"))
    .toHaveText("Email required");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test('"Email": Email is incorrect', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "john.");
  await page.fill('input[id="signupPassword"]', "Password123");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await expect
    .soft(page.locator(".invalid-feedback"))
    .toHaveText("Email is incorrect");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test('"Password": Password required', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupPassword"]', "");
  await page.fill('input[id="signupRepeatPassword"]', "Password123");
  await expect
    .soft(page.locator(".invalid-feedback"))
    .toHaveText("Password required");
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
});

test('"Re-enter password": Re-enter password required', async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.fill('input[name="name"]', "John");
  await page.fill('input[id="signupLastName"]', "Doe");
  await page.fill('input[id="signupEmail"]', "john.doe@example.com");
  await page.fill('input[id="signupRepeatPassword"]', "");
  await page.fill('input[id="signupPassword"]', "Password123");
 
  const registerButton = page.locator('button:text("Register")');
  await expect(registerButton).toBeDisabled();
  await expect
    .soft(page.locator(".invalid-feedback"))
    .toHaveText("Re-enter password required");
});