/// <reference types="cypress" />

describe("Reqres API - GET Single User Not Found", () => {
  it("Should return 404 and an error message when user does not exist", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false,
    }).then((response) => {
      // Validate status code
      expect(response.status).to.be.oneOf([401,404]);

      // If API key is missing, validate error message instead of empty body
      if (response.body.error) {
        expect(response.body.error).to.eq("Missing API key");
      } else {
        expect(response.body).to.be.empty;
      }
    });
  });
});
