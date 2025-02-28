const { expect } = require('@playwright/test');

class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.nameInput = page.locator('input[name="name"]');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button:text("Register")');
    this.errorMessage = page.locator('.invalid-feedback');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async openRegistrationForm() {
    await this.signUpButton.click();
  }

  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillRepeatPassword(password) {
    await this.repeatPasswordInput.fill(password);
  }

  async submitForm() {
    await this.registerButton.click();
  }

  async isRegisterButtonEnabled() {
    return await this.registerButton.isEnabled();
  }

  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }

  async handleSuccessDialog() {
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Registration complete');
      await dialog.accept();
    });
  }
}

module.exports = { RegistrationPage };