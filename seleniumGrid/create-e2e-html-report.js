const reporter = require("multiple-cucumber-html-reporter");

const options = {
  jsonDir: "seleniumGrid",
  reportPath: "seleniumGrid/report",
  displayDuration: true,
  customMetadata: true,
  metadata: [] // do not print default metadata info
};

reporter.generate(options);
