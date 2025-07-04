/// <reference types="cypress" />

const normalize = (str) => str.normalize("NFC");

const SELECTORS = {
  NAVBAR: "nav#main-navbar",
  MAX_CONTAINER: "div.max-w-maximum-web",
  FOOTER: "footer",
  MAIN_SECTION: "div.mx-auto.max-w-maximum-web>div",
};

describe("Land and House CMS", () => {
  beforeEach(() => {
    cy.visit("https://www.lh.co.th/th");
  });

  context("Static layout", () => {
    it("renders the navbar, main content and footer", () => {
      cy.get(SELECTORS.NAVBAR).should("be.visible");
      cy.get(SELECTORS.MAX_CONTAINER).should("be.visible");
      cy.get(SELECTORS.FOOTER).should("be.visible");
    });
  });

  context("Navbar", () => {
    beforeEach(() => {
      cy.get(SELECTORS.NAVBAR).as("navbar");
    });

    it("contains correct children structure", () => {
      cy.get("@navbar")
        .children()
        .as("navbarChildren")
        .should("have.length", 2)
        .last()
        .should("be.visible");

      cy.get("@navbarChildren")
        .last()
        .children()
        .as("navList")
        .should("have.length", 9);
    });

    it("opens brand menu and shows all brands", () => {
      cy.get(SELECTORS.NAVBAR)
        .children()
        .last()
        .children()
        .eq(1) // second item in nav list
        .find("span")
        .contains(normalize("แบรนด์"))
        .click();

      cy.get(SELECTORS.NAVBAR)
        .parent()
        .as("navParent")
        .should("be.visible")
        .children()
        .should("have.length", 3)
        .last()
        .as("slideMenu")
        .should("have.attr", "data-sentry-component", "ActiveMenu")
        .children()
        .last()
        .children()
        .first()
        .should("have.attr", "data-sentry-component", "MenuBrand")
        .as("brandMenu")
        .should("be.visible");

      cy.get("@brandMenu")
        .children()
        .first()
        .children()
        .last()
        .find("a")
        .should("have.length", 16);
    });
  });

  context("Main content sections", () => {
    it("renders expected sections and background components", () => {
      cy.get(SELECTORS.MAIN_SECTION)
        .as("sections")
        .should("be.visible")
        .children()
        .as("sectionItems")
        .should("have.length", 10)
        .each(($el) => cy.wrap($el).should("be.visible"));

      cy.get("@sectionItems")
        .eq(0)
        .should("have.attr", "data-sentry-component", "Background");

      cy.get("@sectionItems")
        .eq(7)
        .should("have.attr", "data-sentry-component", "Background")
        .find("div.hidden.w-full.justify-items-center")
        .children()
        .should("have.length.gte", 1);
    });
  });
});
