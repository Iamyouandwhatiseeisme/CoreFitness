export {};

describe("Product Actions", () => {
  it("Creates Product", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.get("[data-cy='products-page-button']").click();
    cy.wait(4000);
    cy.get("[data-cy='add-product-button']").should("exist");
    cy.get("[data-cy='products-loaded']").should("exist");

    cy.get("[data-cy='add-product-button']").click();
    cy.get("[data-cy='name-input-field']").type("TestProduct");
    cy.get("[data-cy='name-georgian-input-field']").type("ტესტის");
    cy.get("[data-cy='price-input-field']").type("33333");
    cy.get("[data-cy='description-input-field']").type("description for test");
    cy.get("[data-cy='description-georgian-input-field']").type("სატესტო");
    cy.get("[data-cy='category-input-field']").type("Test");
    cy.get("[data-cy='photo-browse-field']").selectFile(
      "cypress/fixtures/CypressTest.png"
    );
    cy.get("[data-cy='create-product-button']").click();
    cy.wait(4000);
    cy.get("[data-cy='TestProduct']").should("exist");

    cy.get("[data-cy='TestProduct']").click();
    cy.wait(4000);
    cy.get("[data-cy='delete-button'").click();
    cy.wait(2000);
    cy.get("[data-cy='add-product-button'").should("exist");
  });
  it("Deletes the product", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.get("[data-cy='products-page-button']").click();
    cy.wait(2000);
    cy.get("[data-cy='add-product-button']").should("exist");
    cy.get("[data-cy='products-loaded']").should("exist");

    cy.get("[data-cy='add-product-button']").click();
    cy.get("[data-cy='name-input-field']").type("testProduct1");
    cy.get("[data-cy='name-georgian-input-field']").type("ტესტის");
    cy.get("[data-cy='price-input-field']").type("33333");
    cy.get("[data-cy='description-input-field']").type("description for test");
    cy.get("[data-cy='description-georgian-input-field']").type("სატესტო");
    cy.get("[data-cy='category-input-field']").type("Test");
    cy.get("[data-cy='photo-browse-field']").selectFile(
      "cypress/fixtures/CypressTest.png"
    );
    cy.get("[data-cy='create-product-button']").click();
    cy.wait(2000);
    cy.get("[data-cy='testProduct1'").should("exist");

    cy.get("[data-cy='testProduct1'").click();
    cy.wait(4000);
    cy.get("[data-cy='delete-button'").click();
    cy.get("[data-cy='add-product-button'").should("exist");
  });
  it("Buys a Product", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.get("[data-cy='products-page-button']").click();
    cy.wait(2000);

    cy.get(`[data-cy='add-to-cart-button-testBuyProduct'`).click();
    cy.get(`[data-cy='open-cart-button'`).click();
    cy.get(`[data-cy='buy-button'`).should("exist");

    cy.intercept("POST", "/api/checkout", {
      statusCode: 200,
      body: { sessionId: "mock-session-id" },
    }).as("createCheckoutSession");
    cy.get(`[data-cy='buy-button'`).click();
    cy.wait("@createCheckoutSession");
  });

  it("Creates Order, after cleans up database", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.wait(3000);

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
      const id = response.body?.data[0].id;
      cy.wrap(id).as("id");
      cy.wait(2000);
      cy.get(`[data-cy='orders-button'`).click();
      cy.wait(8000);
      cy.get(`[data-cy='${id}']`).should("exist");
      cy.wait(2000);

      cy.request({
        method: "POST",
        url: "/api/deleteOrder",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: id,
        }),
      });
      cy.get(`[data-cy='products-page-button'`).click();
      cy.wait(2000);
      cy.get(`[data-cy='orders-button'`).click();

      cy.get(`[data-cy='${id}']`).should("not.exist");
      cy.wait(2000);
    });
  });
});
