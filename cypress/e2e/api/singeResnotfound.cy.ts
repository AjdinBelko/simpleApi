/// <reference types="cypress" />

describe("Reqres API - GET Single Resource Not Found", () => {
  it("Should return 404 and an empty body when the resource does not exist", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/unknown/23",
      failOnStatusCode: false, // Prevent Cypress from failing automatically
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(404);

      // Validate that the response body is empty
      expect(response.body).to.be.empty;
    });
  });
});
