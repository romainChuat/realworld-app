
describe("transaction sort", function () {

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
        cy.get('input[name="username"]').type('rchuat');
        cy.get('input[name="password"]').type("123456");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
    });

    //TODO 
    it("sort by date", function () {
            cy.get('[data-test="nav-top-new-transaction"]').click();
            cy.get('[data-test="user-list-search-input"]').type("Edgar Johns");
            cy.get('[data-test="user-list-item-t45AiwidW"]').click();
            cy.get('input[name="amount"]').type("100");
            cy.get('input[name="description"]').type("test");
            cy.get('[data-test="transaction-create-submit-payment"]').click();
    });
});