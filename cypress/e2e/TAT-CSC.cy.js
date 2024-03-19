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

  // part 4 Excercises
  it('checks the type of service "Feedback"', () => { 
    //cy.get('[type="radio"]').first().check().should('be.checked').and('have.value', 'help');
    cy.get('input[type="radio"][value="help"]').check().should('be.checked').and('have.value','help');
    cy.get('[type="radio"]').check('praise').should('be.checked').and('have.value','praise');
    cy.get('[type="radio"]').check('feedback').should('be.checked').and('have.value','feedback');
  });

  /**
   * Create a test called checks each type of service.
     Make sure that after .check(), each radio has been checked.
   */
  it('checks each type of service', () => {
    cy.get('[type="radio"]')
    .should('have.length', 3)
    .each((typeOfService) => {
      cy.wrap(typeOfService)
      .check()
      .should('be.checked');
    });
  });

  //Part 5 Exersice
  
  it('checks both checkboxes, then unchecks the last one', () => {
    cy.get('input[type="checkbox"]')
    .should('have.length', 2).check().should('be.checked');
    cy.get('input[type="checkbox"]').last().uncheck()
    .should('be.not.checked');
  });

  it('checks both checkboxes, then unchecks the last one', () => {
    cy.get('input[type="checkbox"]')
    .should('have.length', 2).check().should('be.checked')
    .last().uncheck().should('not.be.checked');
  });

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.clock();
    cy.get('[name="firstName"]').type('Daisy');
    cy.get('[id="lastName"]').type("Fuentes");
    cy.get('[type="email"]').type('daisy@gmail.com');
    cy.get('#open-text-area').type('Test');
    cy.get('#phone-checkbox').check();
    cy.contains('button', 'Send').click();
    cy.get('.error').should('be.visible');
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  // 06.md Ex
  it('selects a file from the fixtures folder', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  // 06.md Ex 1
  it('selects a file simulating a drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', { subjectType: 'drag-n-drop' })
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });
// 06.md Ex 2
  it('selects a file using a fixture to which an alias was given', () => {
    cy.fixture('example.json').as('sampleFile');
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  // 06.md Ex
  it('verifies that the privacy policy page opens in another tab without the need for a click', () => {
    cy.contains('a', 'Privacy Policy').should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank');
  });

  // 06.md Ex 1
  it('access the privacy policy page by removing the target, then clicking on the link', () => {
    cy.contains('a', 'Privacy Policy').invoke('removeAttr', 'target')
    .click();
    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible');
  });
// 06.md Ex 1

  it('independently test the privacy policy page', () => {
    cy.contains('a', 'Privacy Policy').invoke('removeAttr', 'target')
    .click();
    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible');
  });

  // it.only('displays a message for 3 seconds', () => {
  //   cy.clock() // freeze the browser clock
  
  //   // (...) // action that triggers something that displays a message for three seconds
  
  //   // (...) // checking that the message is visible
  
  //   cy.tick(3000) // advances the clock by three seconds (in milliseconds). In doing so, we don't need to keep waiting.
  
  //   // (...) // checking that the message is no longer visible
  // });
  it('fills the form and success message is shown', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  });  

  // Extra exercise 2
  it('displays and hides the success and error messages using .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Message successfully sent.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Validate the required fields!')
      .invoke('hide')
      .should('not.be.visible')
  });

  // Extra exercise 3
  it('fills in the text area field using the invoke command', () => {
    cy.get('#open-text-area').invoke('val', 'Welcome to this cypress test. I hope those lessons help me improve my cypress skills')
    .should('be.visible')
    .and('have.value', 'Welcome to this cypress test. I hope those lessons help me improve my cypress skills');
  });

  // Extra exercise 3
  it('makes and HTTP request', () => {
    cy.request({
      method: 'GET',
      url: 'https://tat-csc.s3.sa-east-1.amazonaws.com/index.html'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK');
      expect(response.body).to.include('TAT CSC');
    });
  });
  it('makes an HTTP request', () => {
    cy.request('https://tat-csc.s3.sa-east-1.amazonaws.com/index.html') // by default cy.request will send a get method
      .as('getRequest')
      .its('status')
      .should('be.equal', 200);
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK');
    cy.get('@getRequest')
      .its('body')
      .should('include', 'TAT CSC');  
  });

  // Find the cat exercise 
  it('find the hidden cat', () => {
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')
    .invoke('hide')
    .should('not.be.visible');
  });
  

}); 