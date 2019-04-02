# features/order.feature

@order
Feature: Order

  @make_order
  Scenario: Make an order
    Given I am on the order page
    When I enter the appetizer
    And I pause for 1 ms
    And I submit the order

  Scenario: Make a bad order
    Given I am on the order page
    When I add a side
    And I submit the order
