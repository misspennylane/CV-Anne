const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jjvjsy',
  e2e: {
    setupNodeEvents(on, config) {
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      return config;
    },
    baseUrl: "https://misspennylane.github.io/CV-Anne/",
    video: false,
    screenshotOnRunFailure: true,
    reporter: "allure-mocha",
    reporterOptions: {
      resultsDir: "allure-results",
    }
    }
});
