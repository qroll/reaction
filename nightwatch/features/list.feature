# features/list.feature

@list
Feature: List

  Scenario: View list
    Given I am on the booking page
    And I start a recording
    Given I am on the list page
    Then I create a screenshot
    And I end a recording
