# features/booking.feature

@booking
Feature: Booking

  @make_booking_invalid
  Scenario: Create an invalid booking
    Given I am on the booking page
    When I enter the reason
    And I enter the start time
    And I enter an invalid end time
    And I submit the booking
    Then I should fail to create a booking
