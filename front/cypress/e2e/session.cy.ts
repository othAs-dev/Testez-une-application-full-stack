/// <reference types="Cypress" />
import { adminUser, firstSession, notAdminUser, secondSession, teacher } from "./constants/constants";

describe('Session', () => {
  it('should login as admin successfully', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: adminUser,
    });

    cy.intercept('GET', '/api/session', []).as('session');

    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);

    cy.url().should('include', '/sessions');
  })

  it('should create a session successfully', () => {

    cy.url().should('include', '/sessions');

    cy.intercept('GET', '/api/teacher', { body: [teacher] });

    cy.intercept('POST', '/api/session', {
      body: firstSession
    });

    cy.intercept('GET', '/api/session', {
      body: firstSession
    });


    cy.url().should('include', '/sessions');
    cy.get('button[routerLink=create]').click();
    cy.get('input[formControlName=name]').type("Hard Workout");
    cy.get('input[formControlName=date]').type("2023-05-15");
    cy.get('mat-select[formControlName=teacher_id]').click().get('mat-option').contains('Jean Dubois').click();
    cy.get('textarea[formControlName=description]').type("New session for expert!");
    cy.get('button[type=submit]').click()
    cy.contains('Session created !').should('be.visible');
    cy.url().should('include', '/sessions');
  })

  it('should update a session successfully', () => {

    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', adminUser);

    cy.intercept('GET', '/api/session', [
      firstSession
    ]);
    cy.intercept('GET', '/api/teacher', [
      teacher
    ]);

    cy.get('input[formControlName="email"]').type('yoga@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();

    cy.intercept('GET', '/api/session/1', firstSession);

    cy.intercept('GET', '/api/teacher/1', teacher);
    cy.contains('Edit').click();

    cy.get('input[formControlName="name"]').clear();

    cy.get('input[formControlName="name"]').type('Hardest Session');

    cy.get('textarea[formControlName="description"]').clear();

    cy.get('textarea[formControlName="description"]').type('Expert level be careful');

    cy.intercept('PUT', '/api/session/1', {});
    cy.get('button[type="submit"]').click();

    cy.contains('Session updated !').should('be.visible');
  })

  it('should delete a session successfully', () => {

    cy.intercept('GET', '/api/teacher/1', { body: [teacher] });

    cy.intercept('GET', '/api/session/1', {
      body: firstSession
    });

    cy.intercept('GET', '/api/session', {});

    cy.intercept('DELETE', '/api/session/1', { statusCode: 200 })

    cy.url().should('include', '/sessions');
    cy.contains('Detail').click();
    cy.url().should('include', '/sessions/detail')
    cy.contains('Delete').click();
    cy.url().should('include', '/sessions');
    cy.contains('Session deleted !').should('be.visible');
  })

});

describe('Session with user credential successfully', () => {
  it('should login as user', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: notAdminUser,
    });


    cy.intercept('GET', '/api/session', {
      body: [secondSession]
    });


    cy.get('input[formControlName=email]').type("user@studio.com");
    cy.get('input[formControlName=password]').type(`${"user"}{enter}{enter}`);

    cy.url().should('include', '/sessions');

  })

  it('should access to session and particpate and unparticipate successfully', () => {

    cy.intercept('GET', '/api/teacher/1', { body: teacher });

    cy.intercept('GET', '/api/session/1', {
      body: { ...firstSession, users: [] }
    });

    cy.url().should('include', '/sessions');
    cy.contains('Detail').click();
    cy.url().should('include', '/sessions/detail')
    cy.contains('Participate').should('exist');
    cy.intercept('GET', '/api/session/1', {
      body: { ...firstSession, users: [1] }
    });
    cy.contains('Participate').click();
    cy.intercept('POST', '/api/session/1/participate/1', {})
    cy.intercept('GET', '/api/session/1', {
      body: { ...firstSession, users: [] }
    });
  })

})
