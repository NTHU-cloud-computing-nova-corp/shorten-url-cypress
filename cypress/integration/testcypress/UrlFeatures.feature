Feature: UrlFeatures
    
    Scenario: 003 User delete url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass Delete"
        When user click generate url
        Then user see the short url
        When user click URL tab
        And user search for the url
        When user click delete button
        And user search for the url
        Then user should not see the short url

    Scenario: 004 User privatise url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass Private"
        When user click generate url
        Then user see the short url
        When user click URL tab
        And user search for the url
        # Privatise
        When user click privatise button
        And user search for the url
        Then user should see the url is private

    Scenario: 005 User publicise url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass Public"
        When user click generate url
        Then user see the short url
        When user click URL tab
        And user search for the url
        # Publicise
        When user click publicise button
        And user search for the url
        Then user should see the url is public

    Scenario: 006 User lock url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass Locked"
        When user click generate url
        Then user see the short url
        When user click URL tab
        And user search for the url
        # Publicise
        When user click lock button and fill password as "Dtg45eT"
        And user search for the url
        Then user should see the url is locked

    Scenario: 007 User share url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass Shared"
        When user click generate url
        Then user see the short url
        When user click URL tab
        And user search for the url
        # Share
        When user click lock button and share email to "sarunyu.sst@gmail.com"
        And user search for the url
        Then user should see the url is shared
        When user click send invitation with message as "This our class information!"
        Then user see invitation is sent
    
    Scenario: 008 User update url successfully
        Given user click login with username "ernesto" and password "P@ssw0rd"
        And user fill url as "https://eeclass.nthu.edu.tw/course/6341" and description as "Cloud EEClass Locked"
        When user click generate url
        Then user see the short url
        When user click URL tab
        And user search for the url
        # update
        When user click update button
        And user update long_url as "https://www.youtube.com/watch?v=7gJIyHnD710"
        And user update description as "How to make ice cream"
        And user add tag as "Youtube"
        And user click confirm update button
        Then user should see the url is updated
        When user search for the url
        Then user see updated long_url as "https://www.youtube.com/watch?v=7gJIyHnD710"
        And user see updated description as "How to make ice cream"
        And user see updated tag as "Youtube"

