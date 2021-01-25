/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("./");
    cy.get("#email").type("prueba@mail.com");
    cy.get("#password").type("123456");
    cy.get("#loginButton").click();
  });

  it("goes to admin page", () => {
    cy.url().should("include", "/admin");
  });

  it("create a customer", () => {
    cy.get("h6").contains("Cecotec Shop Admin");
    cy.get("button").eq(4).contains("new customer");
    cy.get("button").eq(4).click();
    cy.get('#name').type("Test Name");
    cy.get('#email').type("test@mail.com");
    cy.get('#password').type("123456");
    cy.get('#phone').type("963852741");
    cy.get('#create-button').click();
    cy.get('#accept-button').click();
  });

  it("edit a customer", () => {
    cy.get("tr").get("#edit-button").last().click();
    cy.get('#name').type(" surname");
    cy.get("button").contains("Update").click();
    cy.get('#accept-button').click();
  });

  it("delete a customer", () => {
    cy.get("tr").get("#delete-button").last().click();
    cy.get("button").contains("Yes").click();
    cy.get('#accept-button').click();
  });

});
