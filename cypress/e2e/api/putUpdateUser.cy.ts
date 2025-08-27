/// <reference types="cypress" />

describe("Reqres API - PUT Update User", () => {
  it("Should successfully update an existing user", () => {
    const requestBody = {
      name: "morpheus",
      job: "zion resident"
    };

    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
      body: requestBody,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      // Validate the status code
      expect(response.status).to.eq(200);

      // Validate updated name and job match the request body
      expect(response.body.name).to.eq(requestBody.name);
      expect(response.body.job).to.eq(requestBody.job);

      // Validate response contains updatedAt timestamp
      expect(response.body).to.have.property("updatedAt");
    });
  });
});
