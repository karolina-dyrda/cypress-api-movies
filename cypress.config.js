const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jsonplaceholder.typicode.com',
    specPattern: 'cypress/tests/*.cy.{js,jsx,ts,tsx}',
    experimentalRunAllSpecs: true
  },
});
