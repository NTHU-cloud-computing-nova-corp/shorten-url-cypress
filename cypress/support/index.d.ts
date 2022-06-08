/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    
    /**
     * Command to click field by field if
     * @example cy.clickField('btnContinue')
     */
    clickField(fieldId: string): Chainable<Subject>;

    /**
     * Command to input value by element test-id
     * @example cy.input('field-id')
     */
    input(fieldId: string, value: string): Chainable<Subject>;

    /**
     * Command to clear value by element test-id
     * @example cy.clearInput('field-id')
     */
    clearInput(fieldId: string): Chainable<Subject>;

    /**
     * Command to click by text in specific selector
     * @example cy.clickByText('span','bangkok')
     */
    clickByText(selector: string, clickByText: string): Chainable<Subject>;

    /**
     * Command to paste value to input by data-testid in specific selector
     * @example cy.pasteInputValue('field-id','bangkok')
     */
    pasteInputValue(fieldId: string, value: string): Chainable<Subject>;
  }
}
