/// <reference types="cypress" />
import { TableDefinition } from "cucumber";
import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";
import CommonPage from "../pages/CommonPage";


When("user click logout",()=>{
    cy.get("#account-nav").click();
    cy.get("#logout-nav").click();
});