/// <reference types="Cypress" />

describe('Register', () => {
  it('register successfully', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', { statusCode: 200 })

    cy.get('input[formControlName=firstName]').type("John")
    cy.get('input[formControlName=lastName]').type("Doe")
    cy.get('input[formControlName=email]').type("john@doe.com")
    cy.get('input[formControlName=password]').type(`${"john123"}{enter}{enter}`)
    cy.url().should('include', '/login')
  })


  it('should show an error if email is already used', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', { statusCode: 400 })

    cy.get('input[formControlName=firstName]').type("firstname")
    cy.get('input[formControlName=lastName]').type("lastname")
    cy.get('input[formControlName=email]').type("john@doe.com")
    cy.get('input[formControlName=password]').type(`${"john123"}{enter}{enter}`)
    cy.get('.error').should('be.visible');
  })


  it('should disable submit button if email field is empty', () => {
    cy.visit('/register')

    cy.get('input[formControlName=firstName]').type("John")
    cy.get('input[formControlName=lastName]').type("Doe")
    cy.get('input[formControlName=password]').type(`${"john123"}{enter}{enter}`)
    cy.get('input[formControlName=email]').should('have.class', 'ng-invalid')
    cy.get('button[type=submit]').should('be.disabled')
  })
})
