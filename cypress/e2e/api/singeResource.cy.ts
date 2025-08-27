/// <reference types="cypress" />

describe("Reqres API - GET Single Resource", () => {
  it("Should successfully fetch a single resource and validate its properties", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/unknown/2",
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate response structure
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.property("id", 2);
      expect(response.body.data).to.have.property("name", "fuchsia rose");
      expect(response.body.data).to.have.property("year", 2001);
      expect(response.body.data).to.have.property("color", "#C74375");
      expect(response.body.data).to.have.property("pantone_value", "17-2031");

      // Validate support section
      expect(response.body).to.have.property("support");
      expect(response.body.support).to.have.property("url");
      expect(response.body.support).to.have.property("text");
    });
  });
});
