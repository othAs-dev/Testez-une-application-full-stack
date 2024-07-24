/// <reference types="Cypress" />
import { adminUser } from "./constants/constants";

describe('Login', () => {

  it('should login successfully', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: adminUser,
    });

    cy.intercept('GET', '/api/session', []).as('session');

    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);
    cy.url().should('include', '/sessions');
  })

  it('should logout successfully', () => {
    cy.url().should('include', '/sessions');
    cy.get('.mat-toolbar > .ng-star-inserted > :nth-child(3)').click();
    cy.url().should('not.contain', '/sessions');
  });


  it('should disable submit button if email field is empty', () => {
    cy.visit('/login');
    cy.get('input[formControlName=email]').clear;
    cy.get('input[formControlName=password]').type(`${"wrongpass"}{enter}{enter}`);
    cy.get('input[formControlName=email]').should('have.class', 'ng-invalid');
    cy.get('.error').should('be.visible');
    cy.get('button[type=submit]').should('be.disabled');
  });


  it('should not login with bad credentials', () => {
    cy.visit('/login');
    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.get('input[formControlName=password]').type(`${"test!4321"}{enter}{enter}`);
    cy.url().should('not.contain', '/sessions');
    cy.get('.error').should('be.visible');
  });

  it('should disable submit button if password field is empty', () => {
    cy.visit('/login');
    cy.get('input[formControlName=password]').clear;
    cy.get('input[formControlName=email]').type(`${"yoga@studio.com"}{enter}{enter}`);
    cy.get('input[formControlName=password]').should('have.class', 'ng-invalid');
    cy.get('.error').should('be.visible');
    cy.get('button[type=submit]').should('be.disabled');
  });

});
