it('can generate a short link', () => {
  const page = cy.visit('http://localhost:4321/', { timeout: 10000});
  
  page.get('input[name=link]').type('https://www.cypress.io/')
  page.get('input[name=alias').type('cypress')
  page.get('button[type=submit]').click()

  cy.visit('/l/cypress').contains('https://www.cypress.io/')
});