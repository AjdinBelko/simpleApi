/// <reference types="cypress" />

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ListUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

describe("Reqres API - GET List Users", () => {
  it("Should fetch the list of users and validate response structure", () => {
    cy.request<ListUsersResponse>({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      // Check status code
      expect(response.status).to.eq(200);

      // Validate the response data array
      expect(response.body.data).to.be.an("array");
      expect(response.body.data.length).to.eq(6);

      // Validate that the first user has all required fields
      const firstUser = response.body.data[0];
      expect(firstUser).to.have.all.keys("id", "email", "first_name", "last_name", "avatar");

      // Verify that the email is valid
      expect(firstUser.email).to.include("@reqres.in");
    });
  });
});
