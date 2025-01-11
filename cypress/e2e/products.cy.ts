describe("Product Actions", () => {
  it("Creates Product", () => {
    cy.login("karachka2@gmail.com", "Karachka2");
    cy.get("[data-cy='products-page-button']").click();
    cy.get("[data-cy='add-product-button']").should("exist");
    cy.get("[data-cy='products-loaded']").should("exist");

    cy.get("[data-cy='add-product-button']").click();
    cy.get("[data-cy='name-input-field']").type("testProduct");
    cy.get("[data-cy='price-input-field']").type("33333");
    cy.get("[data-cy='photo-browse-field']").selectFile(
      "cypress/fixtures/CypressTest.png"
    );
    cy.get("[data-cy='create-product-button']").click();
  });
});
