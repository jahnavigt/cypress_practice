export class ActionHelpers {
    
  clickElement(selector) {
    cy.get(selector).click();
  }

  typeInField(selector, value) {
    cy.get(selector).clear().type(value);
  }

  selectFromDropdown(selector, value) {
    cy.get(selector).select(value);
  }

  checkCheckbox(selector) {
    cy.get(selector).then(($el) => {
      if (!$el.is(':checked')) {
        cy.wrap($el).check();
      }
    });
  }


}
