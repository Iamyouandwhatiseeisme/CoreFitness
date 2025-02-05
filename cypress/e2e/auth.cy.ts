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
    cy.get("[data-cy='right-side-panel']").trigger("mouseover");
    cy.wait(3000);

    cy.get("[data-cy='logout-button']").should("exist");
    cy.get("[data-cy='logout-button']").click();
    cy.wait(2000);
    cy.get("[data-cy='login-button']").should("exist");
  });
  it("Registers user successfully", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");

    cy.get("[data-cy='signup-button']").click();

    cy.wait(2000);
    cy.get("[data-cy='email']").type("karachka223@gmail.com");
    cy.get("[data-cy='password']").type("Karachka22");
    cy.get("[data-cy='confirm-password']").type("Karachka22");
    cy.wait(4000);
    cy.get("[data-cy='signup-button']").click();
    cy.wait(2000);
    cy.get("[data-cy='email']").type("karachka223@gmail.com");
    cy.get("[data-cy='password']").type("Karachka22");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.wait(3000);
    cy.get("[data-cy='header']").trigger("mouseover");
    cy.wait(3000);

    cy.get("[data-cy='profile-button']").click();
    cy.wait(12000);
    cy.get("[data-cy='delete-button']").click();
    cy.scrollTo("top");
    cy.wait(4000);

    cy.get("[data-cy='delete-dialog'").should("exist");
    cy.wait(2000);
    cy.get("[data-cy='confirm-delete-button'").click({ force: true });
    cy.wait(4000);
    cy.visit("http://localhost:3000");
    cy.wait(4000);
    cy.get("[data-cy='login-button']").should("exist");
  });
});
