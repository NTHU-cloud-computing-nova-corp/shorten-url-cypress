/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

import { Interception } from "cypress/types/net-stubbing";

class CommonPage {
  private static testData: any;
  private static loanType: string;

  // static tearDown = () => {
  //   CommonPage.execute_delete("delete from accounts where email like '%Cypress%'");
  //   CommonPage.execute_delete("delete from properties where name like '%Cypress%'");
  // };

  static execute_delete = (query: string) => {
    cy.task("queryDb", query);
  };

  static getTestData = () => {
    return CommonPage.testData;
  };

  static setTestData = () => {
    const testDataFile = Cypress.env("ENV") + "/TestData.json";

    cy.fixture(testDataFile).then(data => {
      CommonPage.testData = data;
    });
  };

  static setupApiRoute = () => {
    cy.intercept("POST", "**/api/v1/signup").as("postSignup");
  };

  static verifyPageContain = (text: string) => {
    cy.get("body").contains(text);
  };
  static verifyPageNotContain = (text: string) => {
    cy.get("body").contains(text).should('not.exist')
  };
}

export default CommonPage;
