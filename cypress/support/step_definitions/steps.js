const { Given, When, Then } = require("cypress-cucumber-preprocessor/steps");

Given(/^I am on the booking page$/, async () => {
  cy.visit(Cypress.env("app_url"));
  cy.get(".app").should("be.visible");
  cy.get("#booking").click();
});

When(/^I enter the reason$/, async () => {
  cy.get("#textfield-reason").type("Meeting");
});

When(/^I enter the start time$/, async () => {
  cy.get("#select-startTime-date").click();
  cy.get("#select-startTime-date .dropdown-item:nth-child(2)").click();

  cy.get("#select-startTime-time").click();
  cy.get("#select-startTime-time .dropdown-item:nth-child(2)").click();
});

When(/^I enter the end time$/, async () => {
  cy.get("#select-endTime-date").click();
  cy.get("#select-endTime-date .dropdown-item:nth-child(2)").click();

  cy.get("#select-endTime-time").click();
  cy.get("#select-endTime-time .dropdown-item:nth-child(3)").click();
});

When(/^I submit the booking$/, async () => {
  cy.get("#button-book").click();
  cy.wait(3000);
});

Then(/^I should successfully create a booking$/, async () => {
  cy.get(".notif-success-book").should("be.visible");
  // cy.get(".notif-success-book").should("have.value", "Hoorah!");
});
