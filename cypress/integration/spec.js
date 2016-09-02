describe('Express Session', function(){

  const baseUrl = Cypress.env('HOST') || 'http://localhost:3000'

  beforeEach(function () {
    cy.visit(baseUrl)
  })

  it('starts without sessions', function(){
    cy.title().should('include', 'First visit')
  })

  it('increments the session counter on each visit', function(){
    cy.visit(baseUrl)
    cy.title().should('include', 'Index page')
    cy.contains('.views', '1')
    cy.visit(baseUrl)
    cy.contains('.views', '2')
  })

  it('can submit a form', function () {
    cy.contains('a', 'Visit')
      .click()
    cy.url().should('contain', '/form')
    cy.get('input[name="name"]')
      .type('foo')
    cy.get('button[type="submit"]')
      .click()

    cy.url().should('equal', baseUrl + '/')
    cy.title().should('include', 'Index page')
    cy.contains('.views', '1')
  })

  it('can execute POST fetch', () => {
    cy.contains('a', 'Visit')
      .click()
    cy.get('button#fetch')
      .click()
    cy.contains('#status', 'ok')
  })

})
