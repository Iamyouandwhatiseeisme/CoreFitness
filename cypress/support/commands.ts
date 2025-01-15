/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  export interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */

    login(email: string, password: string): Chainable<Element>;
    createProduct(title: string): Chainable<Element>;
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.viewport(1536, 864);
  cy.visit("http://localhost:3000");
  cy.get("[data-cy='email']").type(email);
  cy.get("[data-cy='password']").type(password);
  cy.get("[data-cy='login-button']").click();
  cy.get("[data-cy='logout-button']").should("exist");
});
Cypress.Commands.add("createProduct", (title: string) => {
  cy.login("karachka2@gmail.com", "Karachka2");
  cy.get("[data-cy='products-page-button']").click();
  cy.get("[data-cy='add-product-button']").should("exist");
  cy.get("[data-cy='products-loaded']").should("exist");

  cy.get("[data-cy='add-product-button']").click();
  cy.get("[data-cy='name-input-field']").type(title);
  cy.get("[data-cy='price-input-field']").type("33333");
  cy.get("[data-cy='photo-browse-field']").selectFile(
    "cypress/fixtures/CypressTest.png"
  );
  cy.get("[data-cy='create-product-button']").click();
  cy.wait(2000);
  cy.get("[data-cy='testProduct'").should("exist");
});
