describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should be on home page', () => {
    cy.url().should('include', '/')
  })

  it('should go on /imageList page after click #imagesList button', () => {

    cy.get("#imagesList").click();
    cy.url().should('include', '/imagesList')
  })

  it('should go on /create page after click #icreate button', () => {

    cy.get("#create").click();
    cy.url().should('include', '/create')
  })

  it('should go on /enter page after click #enter button', () => {

    cy.get("#enter").click();
    cy.url().should('include', '/enter')
    cy.visit('http://localhost:3000')
  })

  
 

})
