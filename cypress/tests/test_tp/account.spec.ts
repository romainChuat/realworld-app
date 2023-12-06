
describe("create account", function () {

    this.beforeEach(function () {
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
        cy.get('[data-test="signup-last-name"]').should("contain", "Last Name is required");            
    });

    it("show username error message", function () {
        var usernameInput = cy.get('input[name="username"]'); 
        usernameInput.type('JeanJean');
        cy.get('input[name="firstName"]').type("jean");
        cy.get('input[name="lastName"]').type("Jean");
        cy.get('input[name="password"]').type("123456");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        usernameInput.clear();
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-username"]').should("contain", "Username is required");            
    });

    it("show password required error message", function () {
        var passwordInput = cy.get('input[name="password"]'); 
        passwordInput.type('123456');
        cy.get('input[name="firstName"]').type("jean");
        cy.get('input[name="lastName"]').type("Jean");
        cy.get('input[name="username"]').type("JeanJean");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        passwordInput.clear();
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-password"]').should("contain", "Enter your password");            
    });
    it("show password length error message", function () {
        var passwordInput = cy.get('input[name="password"]');
        passwordInput.type('123');
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-password"]').should("contain", "Password must contain at least 4 characters");            
    });


    it("show confirm password error message", function (){
        var confirmPasswordInput = cy.get('input[id="confirmPassword"]');
        confirmPasswordInput.type('123456');
        cy.get('input[name="firstName"]').type("jean");
        cy.get('input[name="lastName"]').type("Jean"); 
        cy.get('input[name="username"]').type("JeanJean");
        cy.get('input[name="password"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        confirmPasswordInput.clear();
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-confirmPassword"]').should("contain", "Confirm your password");
    }); 

    it("show confirm password length error message", function (){
        var confirmPasswordInput = cy.get('input[id="confirmPassword"]');
        var passwordInput = cy.get('input[name="password"]'); 
        passwordInput.type('123456');
        confirmPasswordInput.type('123');
        cy.get('[data-test="signup-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signup-confirmPassword"]').should("contain", "Password does not match");
    });


    it("create account", function () {
        cy.get('input[name="firstName"]').type('jean');
        cy.get('input[name="lastName"]').type("Jean");
        cy.get('input[name="username"]').type("JeanJean");
        cy.get('input[name="password"]').type("123456");
        cy.get('input[id="confirmPassword"]').type("123456");
        cy.get('[data-test="signup-submit"]').should("have.not.attr", 'disabled');
        cy.get('[data-test="signup-submit"]').click();
        cy.location('pathname').should('eq', '/signin');
    });
    it("redirect to signin page", function () {
        cy.get('a').contains('Have an account? Sign In').click();
        cy.location('pathname').should('eq', '/signin');
    });

});


