const { startWebDriver, stopWebDriver } = require("nightwatch-api");

startWebDriver({
  env: "default",
  configFile: "nightwatch/nightwatch.conf.js"
}).catch(err => console.log(err));

process.once("SIGTERM", async () => {
  try {
    await stopWebDriver();
  } finally {
    process.exit();
  }
});
