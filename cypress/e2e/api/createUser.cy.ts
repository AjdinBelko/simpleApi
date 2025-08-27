/// <reference types="cypress" />

describe("Reqres API - POST Create User", () => {
  it("Should successfully create a new user", () => {
    const requestBody = {
      name: "morpheus",
      job: "leader"
    };

    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: requestBody,
      headers: {
        "Content-Type": "application/json" // Explicitly set content type
      }
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(201);

      // Validate response body fields
      expect(response.body).to.have.property("name", requestBody.name);
      expect(response.body).to.have.property("job", requestBody.job);

      // Validate that the response contains an id
      expect(response.body.id).to.not.be.empty;
      expect(response.body.id).to.match(/^\d+$/); // Ensure id is numeric

      // Validate createdAt timestamp format (basic check)
      expect(response.body.createdAt).to.match(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
        "createdAt should be in ISO 8601 format"
      );
    });
  });
});
