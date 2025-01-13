describe("Product Actions", () => {
  xit("Creates Product", () => {
    cy.createProduct("testProduct");
  });
  xit("Deletes the product", () => {
    cy.createProduct("testProduct1");
    cy.get("[data-cy='testProduct1'").click();
    cy.wait(1500);
    cy.get("[data-cy='delete-button'").click();
    cy.get("[data-cy='add-product-button'").should("exist");
  });
  it("Buys a Product", () => {
    const product = "testProduct";
    cy.login("Karachka2@gmail.com", "Karachka2");
    cy.get("[data-cy='products-page-button']").click();

    cy.get(`[data-cy='add-to-cart-button-${product}'`).click();
    cy.get(`[data-cy='open-cart-button'`).click();
    cy.get(`[data-cy='buy-button'`).should("exist");

    cy.intercept("POST", "/api/checkout", {
      statusCode: 200,
      body: { sessionId: "mock-session-id" },
    }).as("createCheckoutSession");
    cy.get(`[data-cy='buy-button'`).click();
    cy.wait("@createCheckoutSession");

    cy.request({
      method: "POST",
      url: "/api/createOrder",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_price: 333,
        stripe_purchase_id: "py_sSA313adsjfC",
        products: [{ quantity: 1, product_id: 28 }],
      }),
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log("Response body:", response.body.data[0].id);
      const id = response.body?.data[0].id;
      cy.wrap(id).as("id");
      cy.wait(2000);
      cy.get(`[data-cy='close-cart-dialog-button']`).click();
      cy.get(`[data-cy='orders-button'`).click();
      cy.wait(8000);
      cy.get(`[data-cy='${id}']`).should("exist");
    });
  });
});
