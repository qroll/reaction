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
  closeSession,
  client
} = require("nightwatch-api");

setDefaultTimeout(60000);

BeforeAll(async () => {
  console.log("Starting WebDriver...");
  await startWebDriver({
    env: "default",
    configFile: "nightwatch/nightwatch.conf.js"
  });
});

Before(async () => {
  await createSession({
    env: "default",
    configFile: "nightwatch/nightwatch.conf.js"
  });
});

After(async () => {
  await client.end();
  await closeSession();
});

AfterAll(async () => {
  console.log("Stopping WebDriver...");
  await stopWebDriver();
});
