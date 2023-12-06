
describe("transaction view", function () {

    var name = "Edgar";
    var lastName = "Johns";

    beforeEach(function () {
        cy.visit('http://localhost:3000/signin');
        cy.get('input[name="username"]').type('Katharina_Bernier');
        cy.get('input[name="password"]').type("s3cret");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
    });

    
    it("sort by date",{scrollBehavior : false}, function () {
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
        cy.get('[data-test="transaction-list-filter-date-range-button"]').click();

        const today = new Date();
        today.setDate(today.getDate() + 1);
        const todayFormatted = today.toISOString().split('T')[0];  

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayFormatted = yesterday.toISOString().split('T')[0]; 
        cy.get('[id="date-range-popover"]').click();
        cy.get(`[data-date="${todayFormatted}"]`).click();
        cy.get(`[data-date="${yesterdayFormatted}"]`).click();
        cy.get('[data-test="main"]').click();
        cy.get('[data-test^="transaction-item-"]:first').should("contain",""+name+' '+lastName+" paid "+receiverName+" "+recieverLastName);
    });

    it("show no transaction due to the date selected",{scrollBehavior : false}, function () {
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
        cy.get('[data-test="transaction-list-filter-date-range-button"]').click();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];  

        const afterTomorrow = new Date();
        afterTomorrow.setDate(afterTomorrow.getDate() + 3);
        const afterTomorrowFormatted = afterTomorrow.toISOString().split('T')[0]; 
        cy.get('[id="date-range-popover"]').click();
        cy.get(`[data-date="${tomorrowFormatted}"]`).click();
        cy.get(`[data-date="${afterTomorrowFormatted}"]`).click();
        cy.get('[data-test="main"]').click();
        cy.get('[data-test="empty-list-header"]').should("contain","No Transactions");


    });

    /*it("sort by amount", function () {
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
        cy.get('[data-test="transaction-list-filter-amount-range-button"]').click();

        cy.get('[data-test="main"]').click();
        cy.get('[data-test="empty-list-header"]').should("contain","No Transactions");
    });*/




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
});