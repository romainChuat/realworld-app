
describe("transaction view", function () {

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

    beforeEach(function () {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type('rchuat');
        cy.get('input[name="password"]').type("123456");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
    });

    //TODO 
    /*it("sort by date", function () {
            cy.get('[data-test="nav-top-new-transaction"]').click();
            cy.get('[data-test="user-list-search-input"]').type("Edgar Johns");
            cy.get('[data-test="user-list-item-t45AiwidW"]').click();
            cy.get('input[name="amount"]').type("100");
            cy.get('input[name="description"]').type("test");
            cy.get('[data-test="transaction-create-submit-payment"]').click();
    });*/

    //it("sort by amount", function () {});

    //it("sort by date and amount", function () {});

    it("show friends transaction", function () {
        var friendsTab = cy.get('[data-test="nav-contacts-tab"]')
        friendsTab.should("contain", 'Friends')
        friendsTab.click();
        cy.get('[data-test="main"]').should("contain", 'Contacts');
    });

    it("show everyone transaction", function () {
        var everyoneTab = cy.get('[data-test="nav-public-tab"]')
        everyoneTab.should("contain", 'Everyone')
        everyoneTab.click();
        cy.get('[data-test="main"]').should("contain", 'Public');
    });

    it("show my transaction", function () {
        var everyoneTab = cy.get('[data-test="nav-public-tab"]')
        everyoneTab.should("contain", 'Everyone')
        everyoneTab.click();
        cy.get('[data-test="main"]').should("contain", 'Public');
    });


    // TODO test after transaction ??

});