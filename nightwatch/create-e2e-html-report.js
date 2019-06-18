// var reporter = require("cucumber-html-reporter");

// var options = {
//   theme: "bootstrap",
//   jsonFile: "nightwatch/reports/cucumber_report.json",
//   output: "nightwatch/reports/cucumber_report.html",
//   reportSuiteAsScenarios: true,
//   launchReport: false
// };

// reporter.generate(options);

const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "nightwatch/reports/json",
  reportPath: "nightwatch/reports/html",
  displayDuration: true,
  customMetadata: true,
  metadata: [] // do not print default metadata info
});
