Feature: Selenium focus issues

  @javascript
  Scenario: Provoke focus issues in another test process
    Given I am on the booking page
    When I provoke focus issues in another test process for 60 seconds
