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
const fs = require("fs");
const path = require("path");

setDefaultTimeout(60000);

const fork = require("child_process").fork;
let child;
let promise;

const getScreenshots = () => {
  try {
    const folder = path.resolve(__dirname, "reports", "gif");

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const screenshots = fs
      .readdirSync(folder)
      .map(file => path.resolve(folder, file));
    return screenshots;
  } catch (err) {
    return [];
  }
};

const attachedScreenshots = getScreenshots();

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

After(async function() {
  child.send({ type: "stop" });
  await promise;
  await client.end();
  await closeSession();

  const World = this; // do not use arrow function as World should be set to this context
  await getScreenshots()
    .filter(file => !attachedScreenshots.includes(file))
    .map(file => {
      attachedScreenshots.push(file);
      console.log(">>> file", file);
      if (file.endsWith(".png")) {
        return World.attach(fs.readFileSync(file), "image/png");
      }
      if (file.endsWith(".gif")) {
        return World.attach(fs.readFileSync(file), "image/gif");
      }
    });
});

AfterAll(async () => {
  console.log("Stopping WebDriver...");
  await stopWebDriver();
});
