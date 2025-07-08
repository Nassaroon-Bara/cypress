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

    //select start date in calendar example 2025-06-01
    cy.get(".ant-picker-cell-inner").contains("1").click();
    // cy.wait(2000);
    //click to open calendar
    cy.get("div.text-label")
      .contains(normalize("สิ้นสุด Event วันที่"))
      .parent()
      .find("input")
      .click();

    //select end date in calendar example 2025-06-26
    // cy.get(".ant-picker-cell-inner").last().contains("10").click();
    cy.get(".ant-picker-cell-inner").contains("3").click();

    //upload photo
    cy.get("div.text-label")
      .contains(normalize("รูปภาพ*"))
      .parent()
      .find("input[type='file']")
      .attachFile("test-event-photo.jpg");

    //click to save button
    cy.get("button").contains(normalize("บันทึกข้อมูล")).click();

    //check success message photo uploaded
    cy.get("div.ant-message-notice-content")
      .find("div>span")
      .contains(normalize("อัปโหลดรูปภาพสำเร็จ"))
      .should("exist");

    //check success message cteate event success
    cy.get("div.ant-message-notice-content")
      .find("div>span")
      .contains(normalize("เพิ่ม Event สำเร็จ"))
      .should("exist");

    //check url redirect to project event page
    cy.wait(1000);
    cy.url().should("include", "/v2/event/project-events");

    //check is project events created exist and click edit button
    // cy.get("table")
    //   .find("tr>td")
    //   .contains(eventName)
    //   .should("exist")
    //   .parent()
    //   .find("button>img[src='/images/icons/EditIcon.svg']")
    //   .click();
  });
});
