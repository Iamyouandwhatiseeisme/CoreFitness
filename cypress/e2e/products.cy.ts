export {};

describe("Product Actions", () => {
  it("Creates Product", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.wait(8000);
    cy.get("[data-cy='header']").trigger("mouseover");
    cy.wait(3000);
    cy.get("[data-cy='products-page-button']").click();
    cy.wait(10000);
    cy.get("[data-cy='add-product-button']").should("exist");
    cy.get("[data-cy='products-loaded']").should("exist");

    cy.get("[data-cy='add-product-button']").click();
    cy.get("[data-cy='name-input-field']").type("TestProduct");
    cy.get("[data-cy='name-georgian-input-field']").type("ტესტის");
    cy.get("[data-cy='price-input-field']").type("2");
    cy.get("[data-cy='description-input-field']").type("description for test");
    cy.get("[data-cy='description-georgian-input-field']").type("სატესტო");
    cy.get("[data-cy='category-input-field']").type("Test");
    cy.get("[data-cy='photo-browse-field-1']").selectFile(
      "cypress/fixtures/shaker1.jpg"
    );

    cy.get("[data-cy='photo-browse-field-2']").selectFile(
      "cypress/fixtures/shaker2.jpg"
    );

    cy.get("[data-cy='create-product-button']").click();
    cy.wait(8000);

    cy.get("[data-cy='TestProduct']").should("exist");

    cy.get("[data-cy='TestProduct']").click();
    cy.wait(4000);
    cy.get("[data-cy='delete-button'").click();
    cy.wait(2000);
    cy.get("[data-cy='add-product-button'").should("exist");
  });
  it("Deletes the product", () => {
    cy.viewport(1536, 864);
    const name = `testProduct${Date.now()}`;
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.wait(3000);
    cy.get("[data-cy='header']").trigger("mouseover");
    cy.wait(3000);
    cy.get("[data-cy='products-page-button']").click();
    cy.wait(2000);
    cy.get("[data-cy='add-product-button']").should("exist");
    cy.get("[data-cy='products-loaded']").should("exist");

    cy.get("[data-cy='add-product-button']").click();
    cy.get("[data-cy='name-input-field']").type(`${name}`);
    cy.get("[data-cy='name-georgian-input-field']").type("ტესტის");
    cy.get("[data-cy='price-input-field']").type("2");
    cy.get("[data-cy='description-input-field']").type("description for test");
    cy.get("[data-cy='description-georgian-input-field']").type("სატესტო");
    cy.get("[data-cy='category-input-field']").type("Test");
    cy.get("[data-cy='photo-browse-field-1']").selectFile(
      "cypress/fixtures/shaker1.jpg"
    );

    cy.get("[data-cy='photo-browse-field-2']").selectFile(
      "cypress/fixtures/shaker2.jpg"
    );

    cy.get("[data-cy='create-product-button']").click();
    cy.wait(2000);
    cy.get(`[data-cy=${name}]`).should("exist");

    cy.get(`[data-cy=${name}]`).click();

    cy.wait(4000);
    cy.get("[data-cy='delete-button'").click();
    cy.wait(4000);
    cy.get("[data-cy='add-product-button'").should("exist");
  });
  it("Buys a Product", () => {
    cy.viewport(1536, 864);
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='email']").type("karachka2@gmail.com");
    cy.get("[data-cy='password']").type("Karachka2");
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='logout-button']").should("exist");
    cy.wait(3000);
    cy.get("[data-cy='header']").trigger("mouseover");
    cy.wait(3000);
    cy.get("[data-cy='products-page-button']").click();
    cy.wait(2000);

    cy.get(`[data-cy='add-to-cart-button-testBuyProduct'`).click();
    cy.wait(3000);
    cy.get("[data-cy='right-side-panel']").trigger("mouseover");
    cy.wait(3000);

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
        total_price: 2,
        stripe_purchase_id: "py_sSA313adsjfC",
        products: [{ quantity: 1, product_id: 28 }],
      }),
    }).then((response) => {
      expect(response.status).to.eq(200);
      const id = response.body?.data[0].id;
      cy.wrap(id).as("id");
      cy.wait(2000);
      cy.get("[data-cy='header']").trigger("mouseover");
      cy.wait(3000);
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
      cy.visit("http://localhost:3000");

      cy.wait(4000);

      cy.get("[data-cy='header']").trigger("mouseover");
      cy.wait(3000);

      cy.get(`[data-cy='orders-button'`).click();

      cy.wait(4000);
      cy.get(`[data-cy='${id}']`).should("not.exist");
      cy.wait(2000);
    });
  });
});
