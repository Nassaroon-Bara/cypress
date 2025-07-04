/// <reference types="cypress" />

const normalize = (str) => str.normalize("NFC");

describe("Land and House CMS Success", () => {
  beforeEach(() => {
    cy.visit("https://www.lh.co.th/th");
  });

  it("check lh-home page", () => {
    //check navbar
    const nav = cy.get("nav#main-navbar").first();
    nav.should("be.visible");

    //-----------------------------------------------------------------

    //check main content
    const main = cy.get("div.max-w-maximum-web").first();
    main.should("be.visible");

    //-----------------------------------------------------------------

    //check footer
    const footer = cy.get("footer").first();
    footer.should("be.visible");

    //-----------------------------------------------------------------

    //check component in navbar
    // nav children
    const navChild = nav.children();
    navChild.should("have.length", 2).last().should("be.visible");

    // nav menu
    // const navList = navChild.children().last().children();
    const navList = navChild.children();
    navList.should("have.length", 9);

    //-----------------------------------------------------------------

    // nav menu find
    const brandButton = navList
      .eq(1)
      .find("span")
      .contains(normalize("แบรนด์"));
    brandButton.should("be.visible");
    brandButton.click();

    cy.wait(2000);

    // check nav brand menu
    const navParent = cy.get("nav#main-navbar").first().parent();
    navParent.should("be.visible");

    const navParentChild = navParent.children();
    navParentChild.should("have.length", 3);

    const slideMenu = navParentChild.last();
    slideMenu.should("have.attr", "data-sentry-component", "ActiveMenu");

    const slideContent = slideMenu
      .children()
      .last()
      .children()
      .first()
      .should("have.attr", "data-sentry-component", "MenuBrand");
    slideContent.should("be.visible");
    const slideContentChild = slideContent.children();
    slideContentChild.should("have.length", 2);
    const navBrandList = slideContentChild.first().children().last();
    navBrandList.find("a").should("have.length", 16);

    //
    cy.reload();
    cy.wait(2000);

    //-----------------------------------------------------------------

    //check main content section

    const mainSection = cy.get("div.mx-auto.max-w-maximum-web>div").first();
    mainSection.should("be.visible");

    mainSection.children().then(($children) => {
      // Now $children is a jQuery object you can reuse
      expect($children).to.have.length(10);

      // Check each element is visible
      $children.each((index, element) => {
        cy.wrap(element).should("be.visible");
      });

      // Now you can safely access by index
      cy.wrap($children.eq(0)).should(
        "have.attr",
        "data-sentry-component",
        "Background"
      );

      cy.wrap($children.eq(7)).should(
        "have.attr",
        "data-sentry-component",
        "Background"
      );

      cy.wrap($children.eq(7))
        .find("div.hidden.w-full")
        .children()
        .should("have.length.gte", 1);
    });
  });
});
