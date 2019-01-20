const I = actor();
// Add in your custom step files

Given(/^I am on the booking page$/, () => {
  I.amOnPage("/");
  I.waitForVisible(".app");
  I.click("#booking");
});

When(/^I enter the reason$/, () => {
  I.appendField("#textfield-reason", "Meeting");
});

When(/^I enter the start time$/, () => {
  I.click("#select-startTime-date");
  I.click("#select-startTime-date .dropdown-item:nth-child(2)");
  I.click("#select-startTime-time");
  I.click("#select-startTime-time .dropdown-item:nth-child(2)");
});

When(/^I enter the end time$/, () => {
  I.click("#select-endTime-date");
  I.click("#select-endTime-date .dropdown-item:nth-child(2)");
  I.click("#select-endTime-time");
  I.click("#select-endTime-time .dropdown-item:nth-child(3)");
});

When(/^I enter an invalid end time$/, () => {
  I.click("#select-endTime-date");
  I.click("#select-endTime-date .dropdown-item:nth-child(2)");
  I.click("#select-endTime-time");
  I.click("#select-endTime-time .dropdown-item:nth-child(2)");
});

When(/^I submit the booking$/, () => {
  I.click("#button-book");
  I.wait(3);
});

Then(/^I should successfully create a booking$/, () => {
  I.waitForVisible(".notif-success-book", 3);
  // Puppeteer does not support Smart Wait
  // I.seeElement(".notif-success-book");
});

Then(/^I should fail to create a booking$/, () => {
  I.waitForVisible(".notif-error-book", 3);
});
