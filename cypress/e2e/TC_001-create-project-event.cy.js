/// <reference types="cypress" />
import "cypress-file-upload";

const normalize = (str) => str.normalize("NFC");
describe("Land and House CMS Success", () => {
  beforeEach(() => {
    cy.visit("https://lh-cms-uat.codemonday.io/login");
    cy.get("input[type='text']").type("nassaroon.b@codemonday.com");
    cy.get("input[type='password']").type("lh@test!");
    cy.get("button").contains("Remember me").click();
    cy.get("button.MuiButton-textSizeMedium.MuiButton-colorPrimary").click();
    cy.url().should("include", "/v2/project");
  });

  it("create project event", () => {
    // Go to tab event
    cy.get("div").contains("จัดการ Event").click();

    // Go to sub tab project Events
    cy.get("div").contains("Project Events").click();

    // cy.url().should("include", "/v2/event");
    cy.url().should("include", "/v2/event/project-events");

    // Click Create Event button
    cy.get("button").contains(normalize("เพิ่ม Project Events ใหม่")).click();

    //chekc url redirect to create project event ใหม่
    cy.url().should("include", "/v2/event/project-events/create?lang=thai");

    //seection 2 Create page -------------------------------------------------------------------------------------

    //click to expand dropdown
    // cy.get("div.text-label")
    //   .contains(normalize("โครงการ"))
    //   .parent()
    //   .find(".ant-select")
    //   .click();
    // cy.get("div.text-label")
    //   .contains(normalize("โครงการ"))
    //   .parent()
    //   .find(".ant-select-selection-search")
    //   .click();

    //select project
    // cy.get(".ant-select-item-option-content")
    //   .contains(
    //     normalize(
    //       "CHAIYAPRUEK Serene Lake-Chiang Mai (ชัยพฤกษ์3 ซีรีนเลค-เชียงใหม่)"
    //     )
    //   )
    //   .click()

    const eventName = "TestEvent" + Math.floor(Math.random() * 1000000);
    cy.get("div.text-label")
      .contains(normalize("ชื่อแคมเปญ"))
      .parent()
      .find("input")
      .type("ทดสอบ Events " + Math.floor(Math.random() * 1000000));
  });
});
