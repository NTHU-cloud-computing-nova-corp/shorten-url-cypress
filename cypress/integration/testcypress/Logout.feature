Feature: Logout

    Scenario: 001 User logout successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        When user click logout
        Then user navigate to the login page with message "You've been logged out"