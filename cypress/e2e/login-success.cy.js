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
    const propertyType = "บ้านคู่"; // สร้างตัวแปรสำหรับกำหนดประเภทสินค้าเพื่อนำไปใช้หลายจุดหรือใช้ในการเช็ค
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
      .contains(normalize(propertyType))
      .click();

    // Click House style
    const HouseStyle = "GRACEFUL SERIES"; // สร้างตัวแปรสำหรับกำหนดสไตล์บ้านเพื่อนำไปใช้หลายจุดหรือใช้ในการเช็ค
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

    // Select Style "GRACEFUL SERIES"
    cy.get(".ant-select-item-option-content")
      .contains("GRACEFUL SERIES")
      .click();

    //Type code house model
    const houseModelCode = "รหัสแบบบ้าน" + Math.floor(Math.random() * 1000000);
    cy.get("div.text-label")
      .contains(normalize("เลขรหัสของแบบบ้านคู่ (ตัวอย่าง : 312BL)"))
      .parent()
      .find("input")
      .type(houseModelCode);

    //type name house model
    const HouseModelName = "แบบบ้านทดสอบ" + Math.floor(Math.random() * 1000000);
    cy.get("div.text-label")
      .contains(normalize("ชื่อแบบบ้านคู่"))
      .parent()
      .find("input")
      .type(HouseModelName);

    //select type model
    const ModelType = "แบบบ้านกลาง"; // สร้างตัวแปรสำหรับกำหนดประเภทสินค้าเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("แบบบ้านนี้ใช้กับโครงการใดได้บ้าง"))
      .parent()
      .find("button")
      .contains(normalize("แบบบ้านกลาง"))
      .click();

    //section 2 -------------------------------------------------------------------------------------
    const HouseArea = "50.05"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("พื้นที่ใช้สอย"))
      .parent()
      .find("input")
      .type("50.05");

    //section 3 -------------------------------------------------------------------------------------

    //Enter Number Room
    const NumberBedroom = "3"; // สร้างตัวแปรสำหรับกำหนดจำนวนห้องเพื่อนำไปใช้
    cy.get("div.items-center>div")
      .contains(normalize("ห้องนอน"))
      .parent()
      .find("input")
      .type("3")
      .should("have.value", "3");

    const NumberBathroom = "2"; // สร้างตัวแปรสำหรับกำหนดจำนวนห้องเพื่อนำไปใช้
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
    const PhotoInside = "home-test.jpg"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
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
    const Floor = "1"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
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
      .attachFile("plan-home.png");

    //Type house detail TH
    const HouseDetailTH = "ทดสอบรายละเอียดแบบบ้านTH"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (th)"))
      .parent()
      .find("textarea")
      .type("ทดสอบรายละเอียดแบบบ้านTH")
      .should("have.value", "ทดสอบรายละเอียดแบบบ้านTH");

    //Type house detail EN
    const HouseDetailEN = "TestDetailPlanEN"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (en)"))
      .parent()
      .find("textarea")
      .type("TestDetailPlanEN")
      .should("have.value", "TestDetailPlanEN");

    //Type house detail zh
    const HouseDetailZH = "测试房屋模型"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (zh)"))
      .parent()
      .find("textarea")
      .type("测试房屋模型")
      .should("have.value", "测试房屋模型");

    //Type Remark
    const Remark = "หมายเหตุทดสอบแบบบ้านสำหรับเทส cypress"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("Remark"))
      .parent()
      .find("textarea")
      .type("หมายเหตุทดสอบแบบบ้านสำหรับเทส cypress")
      .should("have.value", "หมายเหตุทดสอบแบบบ้านสำหรับเทส cypress");

    //save button
    cy.get("button.cursor-pointer.bg-primary.self-center")
      .contains("บันทึก")
      .click();

    //select button to select option VDO youtube
    const VDOYoutube = "VDO Youtube"; // สร้างตัวแปรสำหรับกำหนดประเภทสินค้าเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("เลือกชนิดของการอัปโหลดไฟล์"))
      .parent()
      .find("button")
      .contains(normalize("VDO Youtube"))
      .click();

    //upload thumbnail VDO Youtube
    const ThumbnailVDO = "home-test.jpg"; // สร้างตัวแปรสำหรับกำหนดพื้นที่บ้านเพื่อนำไปใช้
    cy.get("div.text-label")
      .contains(normalize("Thumbnail Youtube"))
      .parent()
      .find("input[type='file']")
      .attachFile("home-test.jpg");

    //enter url Youtube
    const url = "https://youtu.be/4k5849123";
    // cy.get("div.text-label")
    //   .contains("URL Youtube")
    //   .parent()
    //   .find("input")
    //   .type("https://youtu.be/4k5849123")
    //   .should("have.value", "https://youtu.be/4k5849123");

    cy.get("div.text-label")
      .contains("URL Youtube")
      .parent()
      .find("input")
      .clear()
      .type("https://youtu.be/4k5849123", { delay: 100 })
      .blur()
      .should("have.value", url);

    // //upload VDO file
    // cy.get("div.text-label")
    //   .contains(normalize("VDO File"))
    //   .parent()
    //   .find("input[type='file']")
    //   .attachFile("test-video.mp4");

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

    // section check data -------------------------------------------------------------------------------------
    //Check is url redirect to edit house model page using regx ID is any string
    //example : https://lh-cms-uat.codemonday.io/v2/house-model/{ID}/edit
    // cy.url().should("match", /\/v2\/house-model\/[a-zA-Z0-9]{24}\/edit$/);
    cy.url().should("include", "/v2/house-model/").should("include", "/edit");

    //check is house model code exist
    cy.get("div.text-label")
      .contains(normalize("กำหนดประเภทสินค้า"))
      .parent()
      .find(".ant-select-selection-item") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.text", normalize(propertyType));

    cy.get("div.text-label")
      .contains(normalize("กำหนดประเภทสินค้า"))
      .parent()
      .find(".ant-select-selection-item") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.text", normalize(propertyType));

    cy.get("div.text-label")
      .contains(normalize("เลือกสไตล์บ้าน"))
      .parent()
      .find(".ant-select-selection-item") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.text", normalize(HouseStyle));

    cy.get("div.text-label")
      .contains(normalize("เลขรหัสของแบบบ้านคู่ (ตัวอย่าง : 312BL)"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(houseModelCode));

    cy.get("div.text-label")
      .contains(normalize("ชื่อแบบบ้านคู่"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(HouseModelName));

    cy.get("div.text-label")
      .contains(normalize("แบบบ้านนี้ใช้กับโครงการใดได้บ้าง"))
      .parent()
      .find("button") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.text", normalize(ModelType));

    cy.get("div.text-label")
      .contains(normalize("พื้นที่ใช้สอย"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(HouseArea));

    cy.get("div.items-center>div")
      .contains(normalize("ห้องนอน"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(NumberBedroom));

    cy.get("div.items-center>div")
      .contains(normalize("ห้องน้ำ"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(NumberBathroom));

    cy.get("div.text-label")
      .contains(normalize("ภาพภายนอก"))
      .parent()
      .find("img[alt='upload-preview']")
      .should("have.attr", "src")
      .and("not.be.empty");

    cy.get("div.text-label")
      .contains(normalize("ภาพภายใน"))
      .parent()
      .find("img[alt='upload-preview']")
      .should("have.attr", "src")
      .and("not.be.empty");

    cy.get("div.text-label")
      .contains(normalize("ชั้นที่"))
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(Floor));

    cy.get("div.text-label")
      .contains(normalize("รูป Floor Plan"))
      .parent()
      .find("img[alt='upload-preview']")
      .should("have.attr", "src")
      .and("not.be.empty");

    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (th)"))
      .parent()
      .find("textarea") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(HouseDetailTH));

    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (en)"))
      .parent()
      .find("textarea") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(HouseDetailEN));

    cy.get("div.text-label")
      .contains(normalize("รายละเอียด (zh)"))
      .parent()
      .find("textarea") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(HouseDetailZH));

    cy.get("div.text-label")
      .contains(normalize("Remark"))
      .parent()
      .find("textarea") // หา element ที่มีข้อมูลที่ต้องการหา
      .first() //หา element ที่อยู่ตำแหน่งที่ 1
      .should("have.value", normalize(Remark));

    cy.get("div.text-label")
      .contains(normalize("เลือกชนิดของการอัปโหลดไฟล์"))
      .parent()
      .find("button")
      .contains("VDO Youtube")
      .should("have.text", VDOYoutube);

    cy.get("div.text-label")
      .contains("Thumbnail Youtube")
      .parent()
      .find("img[alt='upload-preview']")
      .should("have.attr", "src")
      .and("not.be.empty");

    cy.get("div.text-label")
      .contains("URL Youtube")
      .parent()
      .find("input") // หา element ที่มีข้อมูลที่ต้องการหา
      .should("have.value", url)
      .and("not.be.empty");
  });
});
