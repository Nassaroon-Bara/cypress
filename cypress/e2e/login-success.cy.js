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

  it("Create House Model", () => {
    // Go to House Model page
    cy.get("div").contains("Master Data").click();
    cy.get("div").contains(normalize("ข้อมูลแบบบ้าน/คอนโด")).click();
    cy.url().should("include", "/v2/house-model");

    // Click Create House Model button
    cy.get("button").contains(normalize("เพิ่มแบบบ้าน/คอนโด ใหม่")).click();
    cy.url().should("include", "/v2/house-model/create");

    //section 1 -------------------------------------------------------------------------------------
    // Click project type
    cy.get("div.text-label")
      .contains(normalize("กำหนดประเภทสินค้า"))
      .parent()
      .find(".ant-select")
      .click();
    cy.get("div.text-label")
      .contains(normalize("กำหนดประเภทสินค้า"))
      .parent()
      .find(".ant-select-selection-search")
      .click();

    // Select "บ้านคู่"
    cy.get(".ant-select-item-option-content")
      .contains(normalize("บ้านคู่"))
      .click();

    // Click House style
    cy.get("div.text-label")
      .contains(normalize("เลือกสไตล์บ้าน"))
      .parent()
      .find(".ant-select")
      .click();
    cy.get("div.text-label")
      .contains(normalize("เลือกสไตล์บ้าน"))
      .parent()
      .find(".ant-select-selection-search")
      .click();

    // Select Style "MANTANA 100"
    cy.get(".ant-select-item-option-content").contains("I NATURE").click();

    //Type code house model
    const houseModelCode =
      "TestHouseModel" + Math.floor(Math.random() * 1000000);
    cy.get("div.text-label")
      .contains(normalize("เลขรหัสของแบบบ้านคู่ (ตัวอย่าง : 312BL)"))
      .parent()
      .find("input")
      .type(houseModelCode);

    //type name house model
    cy.get("div.text-label")
      .contains(normalize("ชื่อแบบบ้านคู่"))
      .parent()
      .find("input")
      .type("บ้านคู่ทดสอบ" + Math.floor(Math.random() * 1000000));

    //select type model
    cy.get("div.text-label")
      .contains(normalize("แบบบ้านนี้ใช้กับโครงการใดได้บ้าง"))
      .parent()
      .find("button")
      .contains(normalize("แบบบ้านกลาง"))
      .click();

    //section 2 -------------------------------------------------------------------------------------
    cy.get("div.text-label")
      .contains(normalize("พื้นที่ใช้สอย"))
      .parent()
      .find("input")
      .type("50.05");

    //section 3 -------------------------------------------------------------------------------------

    //Enter Number Room
    cy.get("div.items-center>div")
      .contains(normalize("ห้องนอน"))
      .parent()
      .find("input")
      .type("3")
      .should("have.value", "3");

    //Enter Number Bathroom
    cy.get("div.items-center>div")
      .contains(normalize("ห้องน้ำ"))
      .parent()
      .find("input")
      .type("2")
      .should("have.value", "2");

    //secction 4 Gellery -------------------------------------------------------------------------------------

    //Upload house model image outside
    cy.get("div.text-label")
      .contains(normalize("ภาพภายนอก"))
      .parent()
      .find("input[type='file']")
      .attachFile("home-test.jpg");

    //image should be exist
    cy.get("div.text-label")
      .contains(normalize("ภาพภายนอก"))
      .parent()
      .find("img")
      .should("exist");

    //Upload house model image inside
    cy.get("div.text-label")
      .contains(normalize("ภาพภายใน"))
      .parent()
      .find("input[type='file']")
      .attachFile("home-test.jpg");

    //image should be exist
    cy.get("div.text-label")
      .contains(normalize("ภาพภายนอก"))
      .parent()
      .find("img")
      .should("exist");

    //section 5 Floor -------------------------------------------------------------------------------------

    //type floor
    cy.get("div.text-label")
      .contains(normalize("ชั้นที่"))
      .parent()
      .find("input")
      .type("1")
      .should("have.value", "1");

    //upload floor plan image
    cy.get("div.text-label")
      .contains(normalize("รูป Floor Plan"))
      .parent()
      .find("input[type='file']")
      .attachFile("Floor.jpg");

    //Type house detail TH
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (th)"))
      .parent()
      .find("textarea")
      .type("ทดสอบรายละเอียดแบบบ้านTH")
      .should("have.value", "ทดสอบรายละเอียดแบบบ้านTH");

    //Type house detail EN
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (en)"))
      .parent()
      .find("textarea")
      .type("TestDetailPlanEN")
      .should("have.value", "TestDetailPlanEN");

    //Type house detail zh
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (zh)"))
      .parent()
      .find("textarea")
      .type("测试房屋模型")
      .should("have.value", "测试房屋模型");

    //Type Remark
    cy.get("div.text-label")
      .contains(normalize("Remark"))
      .parent()
      .find("textarea")
      .type("หมายเหตุทดสอบแบบบ้าน99")
      .should("have.value", "หมายเหตุทดสอบแบบบ้าน99");

    //save button
    cy.get("button.cursor-pointer.bg-primary.self-center")
      .contains("บันทึก")
      .click();

    //sumbit button
    cy.get("button.flex.justify-center.items-center")
      .contains("บันทึกข้อมูล")
      .click();

    //check redirect to house model list page
    cy.url().should("include", "/v2/house-model");

    //check success message
    cy.get("div.ant-message-notice-content")
      .find("div>span")
      .contains(normalize("สร้างแบบบ้าน สำเร็จ"))
      .should("exist");

    //check is house model created exist and click edit button
    cy.get("table")
      .find("tr>td")
      .contains(houseModelCode)
      .should("exist")
      .parent()
      .find("button>img[src='/images/icons/EditIcon.svg']")
      .click();

    //Check is url redirect to edit house model page using regx ID is any string
    //example : https://lh-cms-uat.codemonday.io/v2/house-model/{ID}/edit
    // cy.url().should("match", /\/v2\/house-model\/[a-zA-Z0-9]{24}\/edit$/);
    cy.url().should("include", "/v2/house-model/").should("include", "/edit");
  });
});
