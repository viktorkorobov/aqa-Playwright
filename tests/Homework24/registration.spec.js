const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('./registration-page');

test.describe('Реєстрація користувача', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
    await registrationPage.openRegistrationForm();
  });

  test('Успішна реєстрація', async () => {
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString().replace(/:/g, '-');

    await registrationPage.fillName('John');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail(`john.doe_${timeString}@example.com`);
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');

    await expect(registrationPage.registerButton).toBeEnabled();
    await registrationPage.submitForm();
    await expect(registrationPage.page).toHaveURL(/garage/);
    await registrationPage.handleSuccessDialog();
  });

  test('Порожнє поле "Name"', async () => {
    await registrationPage.fillName('');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail('john.doe@example.com');
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');

    await expect.soft(registrationPage.errorMessage).toHaveText('Name required');
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Невірний формат "Last Name"', async () => {
    await registrationPage.fillName('John');
    await registrationPage.fillLastName('');
    await registrationPage.fillEmail('john.doe@example.com');
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');

    await expect.soft(registrationPage.errorMessage).toHaveText('Last name required');
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Невірний формат "Email"', async () => {
    await registrationPage.fillName('John');
    await registrationPage.fillLastName('Doe');
    await registrationPage.fillEmail('');
    await registrationPage.fillPassword('Password123');
    await registrationPage.fillRepeatPassword('Password123');

    await expect.soft(registrationPage.errorMessage).toHaveText('Email required');
    await expect(registrationPage.registerButton).toBeDisabled();
  });

}); 