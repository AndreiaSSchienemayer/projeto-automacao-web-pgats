const { defineConfig } = require('cypress');

module.exports = defineConfig({
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    specPattern: 'cypress/e2e/**/*.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});