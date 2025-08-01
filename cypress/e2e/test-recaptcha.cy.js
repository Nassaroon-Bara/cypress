/// <reference types="cypress" />
const normalize = (str) => str.normalize("NFC");

describe("test-bot-reCAPTCHA", () => {
  before(() => {
    // ทำงานก่อนเริ่มชุดเทสต์ทั้งหมด
    cy.log("Start test suite");
  });

  beforeEach(() => {
    cy.visit("https://lh-uat.codemonday.io/th");
    cy.get("button").contains(normalize("ติดต่อเรา")).click();
  });
  it("Check url", () => {
    cy.url().should("include", "/contact");
  });

  it("Form Contact us", () => {
    cy.contains("ติดต่อสอบถาม แลนด์ แอนด์ เฮ้าส์").should("be.visible");
    //select contact us type
    cy.get("div.text-form-placeholder")
      .contains(normalize("หัวข้อติดต่อ"))
      .click();

    //select form "สนใจโครงการ"
    cy.get("div.overflow-y-auto")
      .contains(normalize("สนใจข้อมูลโครงการ"))
      .click();

    //select project name
    cy.get("div.text-form-placeholder")
      .contains(normalize("ชื่อโครงการ"))
      .click();

    cy.get("div.items-center")
      .contains(normalize("88 แลนด์ แอนด์ เฮ้าส์ ฮิลไซด์ ภูเก็ต"))
      .parent()
      .click();

    //enter user form
    cy.get('input[placeholder="ชื่อ"]').type(normalize("โค้ด", { delay: 100 }));
    cy.get('input[placeholder="นามสกุล"]').type(
      normalize("มันเดย์", { delay: 100 })
    );
    cy.get('input[placeholder="เบอร์โทรศัพท์"]').type(
      normalize("090090909", { delay: 150 })
    );
    cy.get('input[placeholder="อีเมล"]').type(
      normalize("test@codemonday.com", { delay: 300 })
    );
    cy.get('input[placeholder="Line ID"]').type(
      normalize("test_user", { delay: 150 })
    );
    cy.get('textarea[placeholder="พิมพ์ข้อความที่นี่..."]').type(
      normalize("ทดสอบ reCAPTCHA", { delay: 200 })
    );
    //submit button
    cy.get("button").contains(normalize("ส่งข้อมูล")).click();

    //
  });
});
