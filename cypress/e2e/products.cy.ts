describe("Product Actions", () => {
  it("Creates Product", () => {
    cy.createProduct("testProduct");
  });
  it("Deletes the product", () => {
    cy.createProduct("testProduct1");
    cy.get("[data-cy='testProduct1'").click();
    cy.wait(1500);
    cy.get("[data-cy='delete-button'").click();
    cy.get("[data-cy='add-product-button'").should("exist");
  });
});
