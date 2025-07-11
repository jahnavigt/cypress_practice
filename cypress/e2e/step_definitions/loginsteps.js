const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import {LoginSelectors} from '../selectors/loginselectors';
import {ActionHelpers} from '../Actions/actionHelpers';

const actions = new ActionHelpers();
let loginData = {};

before(() => {
  cy.fixture("logindata").then((data) => {
    loginData = data;
  });
});


Given("I open the login page", () => {
  var url = Cypress.env('baseUrl');

  cy.visit(url);

});

When("I enter valid credentials", () => {
 
    actions.typeInField(LoginSelectors.usernameInput,loginData.username);
    actions.typeInField(LoginSelectors.passwordInput,loginData.password);
    actions.clickElement(LoginSelectors.submitButton);
 

});

Then("I should see the dashboard", () => {
  cy.url().should("include", "/dashboard");
});
