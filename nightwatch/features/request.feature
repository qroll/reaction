# features/booking.feature

@request
Feature: Request

  Scenario: Wait for network requests
    When I track network requests
    And I am on the request page
    Then I wait for network requests to complete
