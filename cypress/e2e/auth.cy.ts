export {};

describe("Auth", () => {
  it("Logs User In successfully", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.wait(3000);
    cy.get("[data-cy='logout-button']").should("exist");
  });
  it("Logs User Out successfully", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.wait(3000);
    cy.get("[data-cy='logout-button']").should("exist");
    cy.get("[data-cy='logout-button']").click();
    cy.get("[data-cy='login-button']").should("exist");
  });
  it("Registers user successfully", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka22@gmail.com");
    cy.get("[data-cy='password']").type("Karachka22");
    cy.get("[data-cy='signup-button']").click();

    cy.wait(2000);
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka22@gmail.com");
    cy.get("[data-cy='password']").type("Karachka22");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.wait(3000);

    cy.get("[data-cy='profile-button']").click();
    cy.wait(8000);
    cy.get("[data-cy='delete-user-button']").click();
  });
});
