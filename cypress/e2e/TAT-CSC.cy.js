describe('TAT Customer Service Center', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html');
  });

  it('checks the application title', () => {
    cy.title().should('eq', 'TAT Customer Service Center');
  });

  // Excercise 1
  it('fills in the required fields and submits the form', () => { 
    const longText = Cypress._.repeat('Hellohellohellohellohellohello', 10)
    cy.get('[name="firstName"]').type('Daisy');
    cy.get('[id="lastName"]').type("Fuentes");
    cy.get('[type="email"]').type('daisy@gmail.com');
    cy.get('[id="open-text-area"]').type(longText, {delay: 0});
    cy.contains('button','Send').click();
    cy.get('.success')
    .should('be.visible');
  });

  //Exercise 2
  it('displays an error message when the phone becomes required but it is not fullfilled on before the form submission', () => {
    cy.get('#firstName').type('James');
    cy.get('#lastName').type('Bond');
    cy.get('#email').type('bond.com');
    cy.contains('button', 'Send').click();
    cy.get('.error').should('be.visible');

  });
// Exercise 3
  it('phone number field requires only numerical field, when different field is entered the phone number stays empty', () => {
    cy.get('#phone').type('abcd')
    .should('have.value','');
  });

  // Exercise 4
  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('[name="firstName"]').type('Daisy');
    cy.get('[id="lastName"]').type("Fuentes");
    cy.get('[type="email"]').type('daisy@gmail.com');
    cy.get('#open-text-area').type('Test');
    cy.get('#phone-checkbox').click();
    cy.contains('button', 'Send').click();
    cy.get('.error').should('be.visible');
  });

  // Exercise 5
  it('fills and clears the first name, last name, email, and phone fields', ()=> {
    cy.get('[name="firstName"]').type('Daisy').should('have.value','Daisy').clear().should('have.value','');
    cy.get('[id="lastName"]').type("Fuentes").should('have.value', 'Fuentes').clear().should('have.value','');
    cy.get('[type="email"]').type('daisy@gmail.com').should('have.value', 'daisy@gmail.com').clear().should('have.value','');
    cy.get('#phone-checkbox').click();
    cy.get('#phone').type('1112223333').should('have.value','1112223333').clear().should('have.value','');
  });

  // Exercise 6
  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.contains('button', 'Send').click();
    cy.get('.error').should('be.visible');
  });

  // Exersice 7
  it('successfully submits the form using a custom command', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
  });

  // Exersice 7 version 2
  it('successfully submits the form using a custom command', () => {
    const data = {
      firstName: 'Daisy1',
      lastName: 'Fuentes1',
      email: 'daisy@gmail.com',
      text: 'Test1'
    }
    cy.fillMandatoryFieldsAndSubmit();// if you don't pass argument here it will just use the data from Cypress.Commands file 
    // if you pass data in the method it will use the data written in the test block
  });

  //Exercise 8
  xit('', () => {
    //Change the button locator and instead of using cy.get() use cy.contains(), replace it in all places you used it above
    //<button type="submit" class="button">Send</button> use the 
  });

  // Part 3 Ex 1
  it('selects a product (YouTube) by its content', () => {
    cy.get('#product').select('courses').should('have.value','courses');
  });

  //// Part 3 Ex 2
  it('selects a product (Mentorship) by its value', () => {
    cy.get('#product').select(3).should('have.value', 'mentorship');
  });

  //// Part 3 Ex 2
  it('selects a product (Blog) by its index', () => {
    cy.get('#product').select(1).should('have.value','blog');
    cy.get('#product').select(2).should('have.value','courses');
    cy.get('#product').select(3).should('have.value', 'mentorship');
    cy.get('#product').select(4).should('have.value','youtube');
    
  });

  // it('Get all optins as an Array', () => {
  //   cy.get('#product').select(['blog', 'courses'])
  //   .invoke('val')
  //   .should('deep.equal', ['blog, 'courses'])
  // });

}); 