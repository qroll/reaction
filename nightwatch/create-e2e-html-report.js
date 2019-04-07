var reporter = require("cucumber-html-reporter");

var options = {
  theme: "bootstrap",
  jsonFile: "nightwatch/reports/cucumber_report.json",
  output: "nightwatch/reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: false
};

reporter.generate(options);
