// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('[name="firstName"]').type('Daisy');
    cy.get('[id="lastName"]').type("Fuentes");
    cy.get('[type="email"]').type('daisy@gmail.com');
    cy.get('#open-text-area').type('Test');
    cy.get('[type="submit"]').click();
});

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {

    firstName: 'Angelina',
    lastName: 'Jolie',
    email: 'angelina@gmail.com',
    text: 'Test'
}) => {
    cy.get('[name="firstName"]').type(data.firstName);
    cy.get('[id="lastName"]').type(data.lastName);
    cy.get('[type="email"]').type(data.email);
    cy.get('#open-text-area').type(data.text);
    cy.get('[type="submit"]').click();
});