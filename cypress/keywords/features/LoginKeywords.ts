/// <reference types="cypress" />
import { TableDefinition } from "cucumber";
import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";
import CommonPage from "../pages/CommonPage";


Given("user click login with username {string} and password {string}", (username: string, password: string) => {  
    cy.get("#input-username").type(username);
    cy.get("#input-password").type(password);
    cy.get("#btn-login").click();
});

And("user navigate to the main page", () => {  
    CommonPage.verifyPageContain("Welcome to Url Shortener");
});

Then("user navigate to the login page with message {string}", (message: string) => {
    CommonPage.verifyPageContain(message);
});