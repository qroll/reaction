# features/booking.feature

@booking
Feature: Booking

  @make_booking
  Scenario: Create a booking
    Given I am on the booking page
    When I enter the reason
    And I enter the start time
    And I enter the end time
    And I submit the booking
    Then I should successfully create a booking

  Scenario: Create an invalid booking
    Given I am on the booking page
    When I enter the reason
    And I submit the booking
