/// <reference types="cypress" />

const normalize = (str) => str.normalize("NFC");

describe("Find single house projects location Bangna_Srinakarin", () => {
  beforeEach(() => {
    cy.visit(
      "https://www.lh.co.th/th/product-list/all-project/all-brand/all-zone/all-price/all-lifestyle/all-bedroom"
    );
  });

  it("Should be display SingleHouse_Bangna_Srinakarin", () => {
    //Select SingleHouse
    cy.get("button").contains(normalize("บ้านเดี่ยว")).click();

    //Open Deropdown Menu
    cy.get("div .font-light").contains(normalize("ทำเลที่ตั้ง")).click();

    //Select Siglehouse Location Srinakarin
    cy.get(".ant-checkbox-wrapper>span")
      .contains(normalize("บางนา - ศรีนครินทร์ - เทพารักษ์"))
      .click();
    
      cy.get('.mb-[24px] .md:mb-[48px]').should('');
  });
})