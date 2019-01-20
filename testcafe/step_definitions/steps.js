const { Given, When, Then } = require("cucumber");
const { Selector } = require("testcafe");

Given(/^I am on the booking page$/, async t => {
  await t.navigateTo("http://localhost:3000").expect(Selector(".app").visible)
    .ok;
  await t.click("#booking").wait(1000);
});

When(/^I enter the reason$/, async t => {
  await t.typeText("#textfield-reason", "Meeting");
});

When(/^I enter the start time$/, async t => {
  await t.click("#select-startTime-date").wait(500);
  await t.click("#select-startTime-date .dropdown-item:nth-child(2)").wait(500);
  await t.click("#select-startTime-time").wait(500);
  await t.click("#select-startTime-time .dropdown-item:nth-child(2)").wait(500);
});

When(/^I enter the end time$/, async t => {
  await t.click("#select-endTime-date").wait(500);
  await t.click("#select-endTime-date .dropdown-item:nth-child(2)").wait(500);
  await t.click("#select-endTime-time").wait(500);
  await t.click("#select-endTime-time .dropdown-item:nth-child(3)").wait(500);
});

When(/^I submit the booking$/, async t => {
  await t.click("#button-book").wait(3000);
});

Then(/^I should successfully create a booking$/, async t => {
  await t.expect(Selector(".notif-success-book").visible).ok;
});
