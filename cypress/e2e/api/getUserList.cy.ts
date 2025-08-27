/// <reference types="cypress" />

describe("Reqres API - GET List Users", () => {
  it("Should successfully fetch the list of users and validate structure", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=1"
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate pagination info
      expect(response.body.page).to.eq(1);
      expect(response.body.per_page).to.eq(6);
      expect(response.body.total).to.eq(12);
      expect(response.body.total_pages).to.eq(2);

      // Validate data array exists and has length > 0
      expect(response.body.data).to.be.an("array").and.have.length(6);

      // Validate structure of the first user object
      const firstUser = response.body.data[0];
      expect(firstUser).to.have.property("id");
      expect(firstUser).to.have.property("email");
      expect(firstUser).to.have.property("first_name");
      expect(firstUser).to.have.property("last_name");
      expect(firstUser).to.have.property("avatar");

      // Validate email format using regex
      response.body.data.forEach((user) => {
        expect(user.email).to.match(/\S+@\S+\.\S+/);
      });

      // Validate support section exists
      expect(response.body.support).to.have.property("url");
      expect(response.body.support).to.have.property("text");
    });
  });
});
