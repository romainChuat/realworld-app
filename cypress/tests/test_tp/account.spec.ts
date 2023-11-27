
describe("create account", function () {

    before(function () {
        cy.visit('http://localhost:3000/sign')
        cy.get('[data-test="signup"]').should("contain", "Don't have an account? Sign Up").click();
    });

    //test empty first name input
    it("show first name error message", function () {
        var firstNameInput = cy.get('input[name="firstName"]'); 
        firstNameInput.type('jean');
        cy.get('input[name="lastName"]').type("Jean");
        cy.get('input[name="username"]').type("JeanJean");
        cy.get('input[name="password"]').type("123456");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        firstNameInput.clear();
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-first-name"]').should("contain", "First Name is required");                
    });

    //test empty last name input
    it("show last name error message", function () {
        var lastNameInput = cy.get('input[name="lastName"]'); 
        lastNameInput.type('Jean');
        cy.get('input[name="firstName"]').type("jean");
        cy.get('input[name="username"]').type("JeanJean");
        cy.get('input[name="password"]').type("123456");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        lastNameInput.clear();
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-first-name"]').should("contain", "Last Name is required");            
    });


    


});


