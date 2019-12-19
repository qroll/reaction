const { startWebDriver, stopWebDriver } = require("nightwatch-api");

console.log("Starting WebDriver...");
startWebDriver({
  env: "default",
  configFile: "nightwatch/nightwatch.conf.js"
}).catch(err => console.log(err));

const signals = ["SIGTERM", "SIGINT"];

signals.forEach(sig => {
  process.on(sig, async () => {
    console.log("Stopping WebDriver...");
    try {
      await stopWebDriver();
    } finally {
      process.exit();
    }
  });
});
