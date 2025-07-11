const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const dotenv = require("dotenv");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    env: {
      stepDefinitions: "cypress/e2e/step_definitions/**/*.{js,ts}"
    },
    async setupNodeEvents(on, config) {
      // 🔁 Pick environment: defaults to "dev" if --env ENV= not passed
      const envName = config.env.ENV || "dev";
      const envFilePath = `.env.${envName}`;

      // ✅ Load environment variables from file if it exists
      if (fs.existsSync(envFilePath)) {
        const parsed = dotenv.config({ path: envFilePath }).parsed;
        if (parsed) {
          for (const key in parsed) {
            const cleanKey = key;
            config.env[cleanKey] = parsed[key];
          }
        }
      }

      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }));

      return config;
    }
  }
});
