/// <reference types="cypress" />

interface Resource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface Support {
  url: string;
  text: string;
}

interface ListResourcesResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Resource[];
  support: Support;
}

describe("Reqres API - GET List of Resources", () => {
  it("Should fetch a list of resources and validate the response structure", () => {
    cy.request<ListResourcesResponse>({
      method: "GET",
      url: "https://reqres.in/api/unknown",
    }).then((response) => {
      // Validate status code
      expect(response.status).to.eq(200);

      // Validate pagination info
      expect(response.body.page).to.eq(1);
      expect(response.body.per_page).to.eq(6);
      expect(response.body.total).to.eq(12);
      expect(response.body.total_pages).to.eq(2);

      // Validate data array exists and has at least one resource
      expect(response.body.data).to.be.an("array");
      expect(response.body.data.length).to.be.greaterThan(0);

      // Validate first resource structure
      const firstResource: Resource = response.body.data[0];
      expect(firstResource).to.have.property("id");
      expect(firstResource).to.have.property("name");
      expect(firstResource).to.have.property("year");
      expect(firstResource).to.have.property("color");
      expect(firstResource).to.have.property("pantone_value");

      // Validate data types for the first resource
      expect(firstResource.id).to.be.a("number");
      expect(firstResource.name).to.be.a("string");
      expect(firstResource.year).to.be.a("number");
      expect(firstResource.color).to.match(/^#[0-9A-Fa-f]{6}$/);
      expect(firstResource.pantone_value).to.be.a("string");

      // Validate support object
      expect(response.body.support.url).to.include("https://contentcaddy.io");
      expect(response.body.support.text).to.be.a("string");
    });
  });
});
