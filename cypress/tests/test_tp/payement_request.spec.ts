describe('Payement & request', () => {

    var name = "romain";
    var lastName = "chuat";
    var receiverName = "Arely"; 
    var recieverLastName =  "Kertzmann";

    var name = "Edgar";
    var lastName = "Johns";

    beforeEach(function () {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type('Katharina_Bernier');
        cy.get('input[name="password"]').type("s3cret");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();

        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test^="user-list-search-input"]').focus().type("Tavares_Barrows");
        cy.get('[data-test^="user-list-item-"]:first').should("contain",receiverName+" "+recieverLastName).click(); 
    });


    /**
     * Make payement
     */

    it('Make payement with success', () => {
        
        //cy.get('[data-test^="user-list-item-"]:last').click(); // récupérer nom + prénom
        var transactionName = "Ma transaction";
        var amount = "100";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();

        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();

        cy.get('li :first').click()
        cy.get('[data-test^="transaction-sender-"]').should("contain", name+' '+lastName);
        cy.get('[data-test^="transaction-action-"]').should("contain", 'paid');
        cy.get('[data-test^="transaction-receiver-"]').should("contain", receiverName+' '+recieverLastName);

        cy.get('[data-test^="transaction-description"]').should("contain", transactionName);
        cy.get('[data-test^="transaction-amount-"]').should("contain", "-$"+amount);

    });

    it('Make payement amout error message', () => {
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
        var transactionName = "Ma request";
        var amount = "100";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-request"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();

        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').click()
        cy.get('[data-test^="transaction-sender-"]').should("contain", name+' '+lastName);
        cy.get('[data-test^="transaction-action-"]').should("contain", 'requested');
        cy.get('[data-test^="transaction-receiver-"]').should("contain", receiverName+' '+recieverLastName);

        cy.get('[data-test^="transaction-description"]').should("contain", transactionName);
        cy.get('[data-test^="transaction-amount-"]').should("contain", "+$"+amount);


    });

    it('Make request amout error message', () => {
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