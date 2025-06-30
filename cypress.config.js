import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 50000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        // args is an array of all the arguments that will
        // be passed to browsers when it launches
        if (browser.name === "edge") {
          // open in incognito
          launchOptions.args.push("--inprivate");
        }

        // whatever you return here becomes the launchOptions
        return launchOptions;
      });
    },
    // testIsolation: false,
    experimentalRunAllSpecs: true,
    baseUrl: "https://blmsmobileuat.betagro.com",
    viewportWidth: 1440,
    viewportHeight: 810,
  },
});
