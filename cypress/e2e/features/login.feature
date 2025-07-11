Feature: Login

  Scenario: Valid Login
    Given I open the login page
    When I enter valid credentials
    Then I should see the dashboard
