const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "81avfj",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1440,
  viewportHeight: 810,
});
