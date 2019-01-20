exports.config = {
  output: "./codecept/output",
  helpers: {
    WebDriver: {
      url: "http://localhost:3000",
      browser: "chrome",
      restart: false,
      windowSize: "normal",
      timeouts: {
        script: 60000,
        "page load": 10000
      },
      smartWait: 5000
    }
  },
  include: {
    I: "./codecept/steps_file.js"
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: "./codecept/features/*.feature",
    steps: ["./codecept/step_definitions/steps.js"]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: "./codecept/*_test.js",
  name: "reaction"
};
