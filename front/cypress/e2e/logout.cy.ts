/// <reference types="Cypress" />
describe('Logout spec', () => {

  const notAdminUser = {
    id: 1,
    email: 'email@test.com',
    firstName: 'Emma',
    lastName: 'Lee',
    password: 'pass!1234',
    admin: false,
    createdAt: '2024-0A-01T00:00:00',
    updatedAt: '2024-0A-01T00:00:00',
  };

  before(() => {
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 201,
      body: notAdminUser,
    }).as('login')

    cy.intercept('GET', '/api/session', []).as('sessions');

    cy.get('input[formControlName=email]').type(notAdminUser.email)
    cy.get('input[formControlName=password]').type(`${notAdminUser.password}{enter}{enter}`)

  })

  it('should logout successfully', () => {
    cy.get('.link').contains('Logout').click()
    cy.url().should('eq', Cypress.config().baseUrl)
    cy.get('.link').contains('Logout').should('not.exist')
  })
})
