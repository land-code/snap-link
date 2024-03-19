let globalHref = '';
const LONG_LINK = 'https://www.cypress.io'

describe('can generate a short link', () => {
  it('can generate a short link', () => {
    const page = cy.visit('/', { timeout: 10000});
    
    page.get('input[name=link]').type(LONG_LINK)
    page.get('button[type=submit]').click()

    page.get('p#snap-link-url>a').should('have.attr', 'href').and('contain', 'http')
    page.get('p#snap-link-url>a').invoke('attr', 'href')
      .then(href => {
        if (!href) {
          throw new Error('No href found');
        }
        globalHref = href;
      })
  });
  it('can access the short link', async () => {
    cy.log('Visiting the short link: ', globalHref)
    cy.visit(globalHref)
      .then(() => {
        cy.url().should('be.equals', LONG_LINK)
      })
  })
  it('can view more details about the short link', () => {
    cy.visit(`/links/${globalHref.split('/').pop()}`)
    cy.contains(globalHref.split('/').pop() ?? '').should('exist')
    cy.contains(LONG_LINK).should('exist')
  })
});