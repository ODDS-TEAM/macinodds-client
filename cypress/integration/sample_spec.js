describe('Mac In Odds Test', function() {
    beforeEach(() => {
        cy.visit('http://mac.odds.team/')
      })
    it('go to user page', function() {
        cy.get('#btn-user').click();
        cy.get('mat-nav-list').find(".img_pro").should('have.attr', 'src').should('include','http://clipart-library.com/images/kTMKzGyMc.jpg')
        cy.contains("Christie Kirk");
        cy.contains("@odds.team");
        cy.get('[class="mat-nav-list mat-list-base"]')
        .contains('Menu User Test')

        cy.get('#sign-out')
        .contains('Sign out')
        //cy.get('[]')
    })
    it('test click all botton', function() {
        cy.get('#btn-user').click();
        cy.get("#botton-menu-view-user").click();
        cy.get('#sign-out').click();
    })
  })