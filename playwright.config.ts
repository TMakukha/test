import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',
  
  fullyParallel: false,

  preserveOutput: "failures-only",

  retries: 1,

  forbidOnly: true,
  
  workers: 1,
  
  reporter:
  [ 
    ["list"], 
    ["html", {open: "never"}],
  ],
  
  use: {
    locale: 'ru-RU',
    headless: false,
    video: "on-first-retry",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices[''] },
    },
  ],
});