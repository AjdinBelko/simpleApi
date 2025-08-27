/// <reference types="cypress" />

describe("API test - GET List Users", () => {
  
  it("Get User list from api", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2"
    }).then((response) => {
      
      //expect response status to be 
      expect(response.status).to.eq(200);

      //expecting response in body
      expect(response.body).to.have.property("page", 2);
      expect(response.body).to.have.property("per_page", 6);
      expect(response.body).to.have.property("total", 12);
      expect(response.body).to.have.property("total_pages", 2);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.length(6);

      //response for each data
      response.body.data.forEach((user) => {
        expect(user).to.have.all.keys(
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        );

        // type of data
        expect(user.id).to.be.a("number");
        expect(user.email).to.be.a("string");
        expect(user.first_name).to.be.a("string");
        expect(user.last_name).to.be.a("string");
        expect(user.avatar).to.be.a("string");
      });

      // check support
      expect(response.body.support).to.have.property("url");
      expect(response.body.support).to.have.property("text");
    });
  });

});
