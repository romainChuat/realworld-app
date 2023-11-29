

describe('Like, comment', () => {


    before(function () {
        cy.visit('http://localhost:3000/sign')
        cy.get('[data-test="signup"]').should("contain", "Don't have an account? Sign Up").click();
        cy.get('input[name="firstName"]').type('romain');
        cy.get('input[name="lastName"]').type("chuat");
        cy.get('input[name="username"]').type("rchuat");
        cy.get('input[name="password"]').type("123456");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        cy.get('[data-test="signup-submit"]').click();
  
    });

    beforeEach(function () {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type('rchuat');
        cy.get('input[name="password"]').type("123456");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
    });



    // depuis le menu principale
    it('Like', () => {
        cy.get('li :first')
        
        cy.get('data-test=["user-onboarding-dialog-title"]').then(($element) => {
            // Vérifiez si l'élément est présent avant de continuer
            if ($element.length > 0) {
              cy.get('[data-test="user-onboarding-next"]').click();
            } else {
              // L'élément n'est pas présent, gérer cela en conséquence
              cy.log("L'élément user-onboarding-dialog-title n'est pas présent.");
            }
        });
        cy.get('li :first').click();
        cy.get('[data-test^="transaction-like-count"]').then(($count) => {
            const count = parseInt($count.text());
            cy.get('[data-test^="transaction-like-button-"]').click();
            cy.get('[data-test^="transaction-like-count"]').should("contain", count + 1);
        });
    });

    it('Comment', () =>{
        cy.get('li :first').click();
        cy.get('[data-test^="transaction-comment-input"]').type("un commentaire{enter}");
        cy.get('[data-test^="comment-list-item"]:last').should("contain", "un commentaire");

    });


    // depuis la liste de mes transactions
    


});