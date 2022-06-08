Feature: URL Generation

    Scenario: 002 User generate url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass"
        When user click generate url
        Then user see the short url
        * user open short url and see web page contents of "https://eeclass.nthu.edu.tw/course/6341"
        When user click URL tab
        And user search for the url
        Then user should see the short url with long_url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass"
        