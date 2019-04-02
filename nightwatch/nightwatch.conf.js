const chromedriver = require("chromedriver");

module.exports = {
  globals_path: "../nightwatch/global.js",
  custom_commands_path: ["./nightwatch/custom_commands"],
  test_settings: {
    default: {
      launch_url: "http://localhost:3000",
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 4444,
        cli_args: ["--port=4444"]
      },
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ["disable-gpu"]
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
