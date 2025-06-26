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

    //check url redirect to create project event
    cy.url().should("include", "/v2/event/project-events/create?lang=thai");

    // section 2 Create page -------------------------------------------------------------------------------------

    // click to expand dropdown
    cy.get("div.text-label")
      .contains(normalize("โครงการ"))
      .parent()
      .find(".ant-select-selection-search")
      .click({ force: true });

    // select project
    cy.get(".ant-select-item-option-content")
      .contains(
        normalize(
          "CHAIYAPRUEK Serene Lake-Chiang Mai (ชัยพฤกษ์3 ซีรีนเลค-เชียงใหม่)"
        )
      )
      .click();
    // enter event name
    const eventName = "TestEvent" + Math.floor(Math.random() * 1000000);
    cy.get("div.text-label")
      .contains(normalize("ชื่อแคมเปญ"))
      .parent()
      .find("input")
      .type("ทดสอบ Events " + Math.floor(Math.random() * 1000000));

    //enter event detail
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด"))
      .parent()
      .find("textarea")
      .type(
        "CHAIYAPRUEK Bangna km 15 ฉลองปิดโครงการ...เป็นเจ้าของบ้านหรูบนถนนใหญ่บางนา 🏡 เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด"
      );

    //enter url
    cy.get("div.text-label")
      .contains(normalize("URL สำหรับ Project Events"))
      .parent()
      .find("input")
      .type("https://lh-uat.codemonday.io/th");

    //click to open calendar
    cy.get("div.text-label")
      .contains(normalize("เริ่มต้น Event วันที่"))
      .parent()
      .find("input")
      .click();

    // select date
    cy.get(".ant-picker-dropdown") // modal calendar
      .contains(".ant-picker-cell-inner", "31")
      .click();

    // เช็คว่าค่าใน input เปลี่ยนแล้ว
    cy.get(".ant-picker input").should("have.value", "31-05-2025");
  });
});
