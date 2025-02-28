import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();


if (!process.env.BASE_URL || !process.env.HTTP_USERNAME || !process.env.HTTP_PASSWORD) {
  throw new Error('Не всі змінні оточення вказані у .env файлі');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
   
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD
    },
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on'
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});