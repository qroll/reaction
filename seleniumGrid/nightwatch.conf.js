const chromedriver = require("chromedriver");
const seleniumdriver = require("selenium-server-standalone-jar");

console.log("Cucumber id: ", process.env.CUCUMBER_SLAVE_ID);
const remoteDebuggingPort = `922${process.env.CUCUMBER_SLAVE_ID}`;

module.exports = {
  output_folder: "./nightwatch/reports/xml",
  test_settings: {
    default: {
      selenium: {
        start_process: false,
        port: 4444
      },
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            "disable-gpu",
            `--remote-debugging-port=${remoteDebuggingPort}`
          ],
          w3c: false
        }
      },
      globals: {
        // abortOnAssertionFailure: false,
        // waitForConditionPollInterval: 1000,
        waitForConditionTimeout: 5000
      }
    }
  }
};
