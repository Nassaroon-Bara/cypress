describe('Test-landhouses', () => {
    it('Shoud be display SingleHouse_Srinakarin', () => {
    
// visit landandhouses website
cy.get(".no-scrollbar>button").contains(normalize("บ้านเดี่ยว")).click();

cy.get("div .font-light").contains(normalize("ทำเลที่ตั้ง")).click();

cy.get("label>span")
  .contains(normalize("บางนา - ศรีนครินทร์ - เทพารักษ์"))
  .click();
})
})
