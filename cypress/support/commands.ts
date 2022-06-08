/// <reference types="cypress" />
/// <reference path="index.d.ts" />

const COMMAND_DELAY = 500;


export const clickField = (fieldId: string) => {
  cy.get(`"#${fieldId}"`).click();
};

export const input = (fieldId: string, value: string) => {
  cy.get(`"#${fieldId}"`)
    .clear({ force: true })
    .type(value, { force: true });
};

export const clearInput = (fieldId: string) => {
  cy.get(`#${fieldId}"`).clear({ force: true });
};

export const clickByText = (selector: string, text: string) => {
  cy.contains(selector, text).click();
};

export const pasteInputValue = (fieldId: string, value: string) => {
  const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value") as any).set;

  const changeInputValue = (inputToChange: any) => (newValue: any) => {
    nativeInputValueSetter.call(inputToChange[0], newValue);
    inputToChange[0].dispatchEvent(new Event("change", { bubbles: true }));
  };

  return cy.get(`[id="${fieldId}"`).then(input => changeInputValue(input)(value));
};

Cypress.Commands.add("pasteInputValue", pasteInputValue);
Cypress.Commands.add("clickField", clickField);
Cypress.Commands.add("input", input);
Cypress.Commands.add("clearInput", clearInput);
Cypress.Commands.add("clickByText", clickByText);
