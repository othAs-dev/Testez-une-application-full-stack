/// <reference types="cypress" />
import { adminUser, notAdminUser } from "./constants/constants";

describe('Account', () => {

  it('should login successfully', () => {
    cy.visit('/login')

    cy.intercept('GET', '/api/session', []).as('session')

    cy.intercept('POST', '/api/auth/login', {
      body: adminUser,
    }).as('login informations')


    cy.get('input[formControlName=email]').type("user@studio.com")
    cy.get('input[formControlName=password]').type(`${"user"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })

  it('should show account information successfully', () => {

    cy.intercept('GET', '/api/user/1', {
      body: notAdminUser
    }).as('user informations')


    cy.get('[routerlink="me"]').click()
    cy.url().should('include', '/me')
    cy.get('.my2 > .mat-focus-indicator').should('exist')
  })


  it('should delete the account successfully', () => {

    cy.intercept('GET', '/api/user/1', {
      body: notAdminUser
    }).as('user informations')

    cy.intercept('GET', '/api/session', {});

    cy.intercept('DELETE', '/api/user/1', { statusCode: 200 })

    cy.url().should('include', '/me');
    cy.get('.my2 > .mat-focus-indicator').click()
    cy.get('[routerlink="login"]').should('exist')
    cy.get('[routerlink="register"]').should('exist')

  })

})
