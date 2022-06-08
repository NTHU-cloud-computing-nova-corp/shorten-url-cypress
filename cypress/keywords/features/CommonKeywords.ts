/// <reference types="cypress" />
import { TableDefinition } from "cucumber";
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import CommonPage from "../pages/CommonPage";

before(() => {
  CommonPage.setTestData();
});

beforeEach(() => {
  cy.visit(`/`);
});

after(() => {
  // CommonPage.tearDown();
})
