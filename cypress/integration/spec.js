describe('Express Session', function(){

  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('starts without sessions', function(){
    cy.title().should('include', 'First visit')
  })

  it('increments the session counter on each visit', function(){
    cy.visit('http://localhost:3000')
    cy.title().should('include', 'Index page')
    cy.contains('.views', '1')
    cy.visit('http://localhost:3000')
    cy.contains('.views', '2')
  })

  it('can submit a form', function () {
    cy.contains('a', 'Visit')
      .click()
    cy.url().should('contain', '/form')
    cy.get('input[name="name"]')
      .type('foo')
    cy.get('button')
      .click()

    cy.url().should('equal', 'http://localhost:3000/')
    cy.title().should('include', 'Index page')
    cy.contains('.views', '1')
  })

})
