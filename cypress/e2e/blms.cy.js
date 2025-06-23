/// <reference types="cypress" />
const normalize = (str) => str.normalize("NFC");

describe("login-Farmer", () => {
  // beforeEach(() => {
  //   cy.visit("https://blmsmobileuat.betagro.com/th/login");
  // });

  it("should be login Role Farmer successfully", () => {
    // cy.on("uncaught:exception", (err, runnable) => {
    //   // กรองเฉพาะ React Error #418 หรือไม่สนใจ error บางประเภท
    //   if (err.message.includes("Minified React error #418")) {
    //     return false; // ปิดไม่ให้ Cypress fail
    //   }
    // });

    // enter username email
    // cy.get(normalize('input[id="อีเมล หรือ ชื่อผู้ใช้"]')).type(
    //   "extfarmerworker.poultry@gmail.com"
    // );
    cy.visit("https://blmsmobileuat.betagro.com/th/login");

    cy.get("label")
      .contains(normalize("อีเมล หรือ ชื่อผู้ใช้"))
      .parent()
      .find("input")
      .first()

      .type("extfarmerworker.poultry@gmail.com");
    // .type("test");

    // enter password
    // cy.get(normalize('input[id="รหัสผ่าน"]')).type("kpzT017e1!$1");
    cy.get("label")
      .contains(normalize("รหัสผ่าน"))
      .parent()
      .find("input")
      .type("kpzT017e1!$1");

    // click login
    cy.get("button").contains(normalize("เข้าสู่ระบบ")).click();

    // should br url https://blmsmobileuat.betagro.com/th/owner?
    cy.url().should("include", "/th/owner?");
  });
});
