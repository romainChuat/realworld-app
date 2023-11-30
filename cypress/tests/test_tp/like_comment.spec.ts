

describe('Like, comment', () => {

    var name = "Edgar";
    var lastName = "Johns";

    beforeEach(function () {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type('Katharina_Bernier');
        cy.get('input[name="password"]').type("s3cret");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
    });
    
    it('Like after payement', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test^="user-list-search-input"]').focus().type("Tavares_Barrows");
        var receiverName = "Arely"; 
        var recieverLastName =  "Kertzmann";
        cy.get('[data-test^="user-list-item-"]:first').should("contain",receiverName+" "+recieverLastName).click(); 
        var transactionName = "Un payement de test";
        var amount = "185";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').click();

        cy.get('[data-test^="transaction-sender-"]').should("contain", name+' '+lastName);
        cy.get('[data-test^="transaction-action-"]').should("contain", 'paid');
        cy.get('[data-test^="transaction-receiver-"]').should("contain", receiverName+' '+recieverLastName);

        cy.get('[data-test^="transaction-description"]').should("contain", transactionName);
        cy.get('[data-test^="transaction-amount-"]').should("contain", "-$"+amount);
        
        cy.get('[data-test^="transaction-like-count"]').should("contain", '0');
        cy.get('[data-test^="transaction-like-button-"]').click();
        cy.get('[data-test^="transaction-like-count"]').should("contain", '1');
        cy.get('[data-test^="transaction-like-button-"]').should("have.attr", "disabled");

    });

    it('Like after request', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test^="user-list-search-input"]').focus().type("Tavares_Barrows");
        var receiverName = "Arely"; 
        var recieverLastName =  "Kertzmann";
        cy.get('[data-test^="user-list-item-"]:first').should("contain",receiverName+" "+recieverLastName).click(); 
        var transactionName = "Une requete de test";
        var amount = "185";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-request"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').click();

        cy.get('[data-test^="transaction-sender-"]').should("contain", name+' '+lastName);
        cy.get('[data-test^="transaction-action-"]').should("contain", 'requested');
        cy.get('[data-test^="transaction-receiver-"]').should("contain", receiverName+' '+recieverLastName);

        cy.get('[data-test^="transaction-description"]').should("contain", transactionName);
        cy.get('[data-test^="transaction-amount-"]').should("contain", "+$"+amount);
        
        cy.get('[data-test^="transaction-like-count"]').should("contain", '0');
        cy.get('[data-test^="transaction-like-button-"]').click();
        cy.get('[data-test^="transaction-like-count"]').should("contain", '1');
        cy.get('[data-test^="transaction-like-button-"]').should("have.attr", "disabled");
    });


    // comment after request
    it('Comment after request', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test^="user-list-search-input"]').focus().type("Tavares_Barrows");
        var receiverName = "Arely"; 
        var recieverLastName =  "Kertzmann";
        cy.get('[data-test^="user-list-item-"]:first').should("contain",receiverName+" "+recieverLastName).click(); 
        var transactionName = "Une requete de test";
        var amount = "185";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-request"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').click();

        cy.get('[data-test^="transaction-sender-"]').should("contain", name+' '+lastName);
        cy.get('[data-test^="transaction-action-"]').should("contain", 'requested');
        cy.get('[data-test^="transaction-receiver-"]').should("contain", receiverName+' '+recieverLastName);

        cy.get('[data-test^="transaction-description"]').should("contain", transactionName);
        cy.get('[data-test^="transaction-amount-"]').should("contain", "+$"+amount);
        var commentaire = "Mon commentaire de test"
        cy.get('[data-test^="transaction-comment-input"]').type(commentaire+'{enter}');
        cy.get('[data-test^="comment-list-item"]:last').should("contain", commentaire);

    });


    it('Comment after payement', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test^="user-list-search-input"]').focus().type("Tavares_Barrows");
        var receiverName = "Arely"; 
        var recieverLastName =  "Kertzmann";
        cy.get('[data-test^="user-list-item-"]:first').should("contain",receiverName+" "+recieverLastName).click(); 
        var transactionName = "Un payement de test";
        var amount = "185";
        cy.get('input[name="amount"]').type(amount);
        cy.get('input[name="description"]').type(transactionName);
        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        // recherche le payement
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('li :first').click();

        cy.get('[data-test^="transaction-sender-"]').should("contain", name+' '+lastName);
        cy.get('[data-test^="transaction-action-"]').should("contain", 'paid');
        cy.get('[data-test^="transaction-receiver-"]').should("contain", receiverName+' '+recieverLastName);

        cy.get('[data-test^="transaction-description"]').should("contain", transactionName);
        cy.get('[data-test^="transaction-amount-"]').should("contain", "-$"+amount);
        var commentaire = "Mon commentaire de test"
        cy.get('[data-test^="transaction-comment-input"]').type(commentaire+'{enter}');
        cy.get('[data-test^="comment-list-item"]:last').should("contain", commentaire);

    });

    it('Comment', () =>{
        cy.get('li :first').click();
        cy.get('[data-test^="transaction-comment-input"]').type("un commentaire{enter}");
        cy.get('[data-test^="comment-list-item"]:last').should("contain", "un commentaire");

    });


    // like + comment depuis les list


});