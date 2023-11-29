describe('Payement & request', () => {

    var name = "romain";
    var lastName = "chuat";

    before(function () {
        cy.visit('http://localhost:3000/sign')
        cy.get('[data-test="signup"]').should("contain", "Don't have an account? Sign Up").click();
        cy.get('input[name="firstName"]').type(name);
        cy.get('input[name="lastName"]').type(lastName);
        cy.get('input[name="username"]').type("rchuat");
        cy.get('input[name="password"]').type("123456");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        cy.get('[data-test="signup-submit"]').click();

    });

    beforeEach(function () {
        cy.visit('http://localhost:3000/sign');
        cy.get('input[name="username"]').type('rchuat');
        cy.get('input[name="password"]').type("123456");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="nav-top-new-transaction"]').click();
    });


    /**
     * Make payement
     */

    it('Make payement with success', () => {
        cy.get('[data-test^="user-list-item-"]:last').click(); // récupérer nom + prénom
        var transactionName = "Ma transaction";
        var amount = "100";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();

        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').should("contain", transactionName);
        cy.get('li :first').should("contain", "-$" + amount);
        cy.get('li :first').should("contain", name + " " + lastName+" paid ");

    });

    it('Make payement amout error message', () => {
        cy.get('[data-test^="user-list-item-"]:last').click();
        var transactionName = "Ma transaction";
        var amount = "100";
        var amountInput = cy.get('input[name="amount"]');
        amountInput.type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-payment"]').should('have.not.attr', 'disabled');
        amountInput.clear();

        cy.get('[data-test="transaction-create-submit-payment"]').should('have.attr', 'disabled');
        cy.get('[data-test="transaction-create-amount-input"]').should("contain", "Please enter a valid amount");
    });

    it('Make payement note error message', () => {
        cy.get('[data-test^="user-list-item-"]:last').click();
        var transactionName = "Ma transaction";
        var amount = "100";
        var note  = cy.get('input[name="description"]')
        note.type(transactionName);
        cy.get('input[name="amount"]').type(amount);
        cy.get('[data-test="transaction-create-submit-payment"]').should('have.not.attr', 'disabled');
        note.clear();
        cy.get('[data-test="transaction-create-submit-payment"]').should('have.attr', 'disabled');
        cy.get('[data-test="transaction-create-description-input"]').should("contain", "Please enter a note");
    });

    /**
     * Make Request payement
     */

    it('Make request with success', () => {
        cy.get('[data-test^="user-list-item-"]:last').click(); // récupérer nom + prénom
        var transactionName = "Ma request";
        var amount = "100";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-request"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();

        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').should("contain", transactionName);
        cy.get('li :first').should("contain", "+$" + amount);
        cy.get('li :first').should("contain", name+" "+lastName+" requested ");

    });

    it('Make request amout error message', () => {
        cy.get('[data-test^="user-list-item-"]:last').click();
        var transactionName = "Ma request";
        var amount = "100";
        var amountInput = cy.get('input[name="amount"]');
        amountInput.type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-payment"]').should('have.not.attr', 'disabled');
        amountInput.clear();

        cy.get('[data-test="transaction-create-submit-request"]').should('have.attr', 'disabled');
        cy.get('[data-test="transaction-create-amount-input"]').should("contain", "Please enter a valid amount");
    });

    it('Make request note error message', () => {
        cy.get('[data-test^="user-list-item-"]:last').click();
        var transactionName = "Ma request";
        var amount = "100";
        var note  = cy.get('input[name="description"]')
        note.type(transactionName);
        cy.get('input[name="amount"]').type(amount);
        cy.get('[data-test="transaction-create-submit-payment"]').should('have.not.attr', 'disabled');
        note.clear();
        cy.get('[data-test="transaction-create-submit-request"]').should('have.attr', 'disabled');
        cy.get('[data-test="transaction-create-description-input"]').should("contain", "Please enter a note");
    });



});