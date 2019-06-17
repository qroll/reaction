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

const fork = require("child_process").fork;
let child;
let promise;

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
  child = fork(__dirname + "/step_definitions/screencast");
  child.send({
    type: "start",
    args: { options: { url: "http://localhost:3000" } }
  });
  promise = new Promise(resolve => {
    child.on("close", resolve);
    child.on("exit", resolve);
  });
});

After(async () => {
  child.send({ type: "stop" });
  await promise;
  await client.end();
  await closeSession();
});

AfterAll(async () => {
  console.log("Stopping WebDriver...");
  await stopWebDriver();
});
