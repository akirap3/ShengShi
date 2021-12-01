/// <reference types="cypress"/>

describe('login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('login test', () => {
    cy.get('input[placeholder=Email]').type('mary@gmail.com');
    cy.get('input[type=password]').type('123456');
    cy.contains('span', '確 認').click();
  });
});
