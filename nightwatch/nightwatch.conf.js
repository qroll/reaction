const chromedriver = require("chromedriver");

module.exports = {
  globals_path: "../nightwatch/global.js",
  custom_commands_path: ["./nightwatch/custom_commands"],
  output_folder: "./nightwatch/reports/xml",
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
          args: [
            "disable-gpu",
            "--remote-debugging-port=9222",
            "--window-size=1280,720"
          ]
        }
      },
      screenshots: {
        enabled: true,
        path: "./nightwatch/reports/screenshots",
        on_failure: true
      },
      globals: {
        // abortOnAssertionFailure: false,
        // waitForConditionPollInterval: 1000,
        waitForConditionTimeout: 5000
      }
    }
  }
};
