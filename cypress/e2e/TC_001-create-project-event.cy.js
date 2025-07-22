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
    const projectName =
      "CHAIYAPRUEK Serene Lake-Chiang Mai (ชัยพฤกษ์3 ซีรีนเลค-เชียงใหม่)"; // สร้างตัวแปรสำหรับกำหนดชื่อโครงการเพื่อนำไปใช้หลายจุดหรือใช้
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
    const eventName = "ทดสอบแคมเปญ" + Math.floor(Math.random() * 1000000);
    cy.get("div.text-label")
      .contains(normalize("ชื่อแคมเปญ"))
      .parent()
      .find("input")
      .type(eventName);

    //enter event detail
    const eventDetail = "CHAIYAPRUEK Bangna km 15 ฉลองเปิดโครงการ🏡";
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด"))
      .parent()
      .find("textarea")
      .type("CHAIYAPRUEK Bangna km 15 ฉลองเปิดโครงการ🏡");

    //enter url
    const eventUrl = "https://lh-uat.codemonday.io/th";
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

    // //select start date in calendar example 2025-06-01
    cy.get(".ant-picker-cell-inner").contains("22").click();
    //cy.wait(2000);

    //click to open calendar
    // cy.get("div.text-label")
    //   .contains(normalize("สิ้นสุด Event วันที่"))
    //   .parent()
    //   .find("input")
    //   .last()
    //   .click();

    // // select end date in calendar example 2025-06-26
    // cy.get(".ant-picker-cell-inner").last().contains("31").click();
    // // cy.get(".ant-picker-cell-inner").contains("31").click();

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // เลือกอีก 7 วันข้างหน้า
    const day = targetDate.getDate().toString();
    cy.contains(".ant-picker-cell-inner", day).click();

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

    // section 3 Re-check data -------------------------------------------------------------------------------------
    //check url redirect to project event page
    cy.wait(1000);
    cy.url().should("include", "/v2/event/project-events");

    cy.get("table")
      .find("tr>td")
      .contains(projectName)
      .should("exist")
      .parent()
      .find("button>img[src='/images/icons/EditIcon.svg']")
      .click();

    //check project name is selected
    cy.get("div.text-label")
      .contains(normalize("โครงการ"))
      .parent()
      .find(".ant-select-selection-item") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element
      .should("have.text", normalize(projectName));

    //check event name is selected
    cy.get("div.text-label")
      .contains(normalize("ชื่อแคมเปญ"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element
      .should("have.value", normalize(eventName));

    //check event detail is correct
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด"))
      .parent()
      .find("textarea") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element
      .should("have.text", normalize(eventDetail));

    //check url is correct
    cy.get("div.text-label")
      .contains(normalize("URL สำหรับ Project Events"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element
      .should("have.value", normalize(eventUrl));

    // //check start date is correct
    // cy.get("div.text-label")
    //   .contains(normalize("เริ่มต้น Event วันที่"))
    //   .parent()
    //   .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
    //   .first() //หา element
    //   .should("have.value", normalize("31/07/2025"));

    // //check end date is correct
    // cy.get("div.text-label")
    //   .contains(normalize("สิ้นสุด Event วันที่"))
    //   .parent()
    //   .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
    //   .first() //หา element
    //   .should("have.value", normalize("22/07/2025"));

    cy.get("div.text-label")
      .contains(normalize("เริ่มต้น Event วันที่"))
      .parent()
      .find("input")
      .should("have.value", normalize("29/06/2025"));

    cy.get("div.text-label")
      .contains(normalize("สิ้นสุด Event วันที่"))
      .parent()
      .find("input")
      .should("have.value", normalize("22/07/2025"));

    //check photo is correct
    cy.get("div.text-label")
      .contains(normalize("รูปภาพ*"))
      .parent()
      .find("img[alt='upload-preview']")
      .should("have.attr", "src")
      .and("not.be.empty");
  });
});
