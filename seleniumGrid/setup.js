const {
  setDefaultTimeout,
  AfterAll,
  After,
  BeforeAll,
  Before
} = require("cucumber");
const {
  startWebDriver,
  stopWebDriver,
  createSession,
  closeSession
} = require("nightwatch-api");

setDefaultTimeout(60000);

BeforeAll(async () => {
  // console.log("Starting WebDriver...");
  // await startWebDriver({
  //   env: "default",
  //   configFile: "nightwatch/nightwatch.conf.js"
  // });
});

Before(async () => {
  await createSession({
    env: "default",
    configFile: "seleniumGrid/nightwatch.conf.js"
  });
});

After(async () => {
  await closeSession();
});

AfterAll(async () => {
  // console.log("Stopping WebDriver...");
  // await stopWebDriver();
});
