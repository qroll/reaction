@A
Feature: A

  Scenario: Visit a web page
    When I visit 'https://google.com'
    Then I see '#hplogo'
    When I pause for 5 seconds
    And I visit 'https://www.bing.com/'
    Then I see '.hp_sw_logo'

