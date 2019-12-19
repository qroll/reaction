@B
Feature: B

  Scenario: Visit a web page
    When I visit 'https://www.bing.com/'
    Then I see '.hp_sw_logo'
    When I visit 'https://google.com'
    Then I see '#hplogo'
