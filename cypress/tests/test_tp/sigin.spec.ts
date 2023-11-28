describe("create account", function () {

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

    this.beforeEach(function () {
        cy.visit('http://localhost:3000/sign');
    });

    //test empty username input
    it("show username error message", function () {
        var usernameInput = cy.get('input[name="username"]');
        usernameInput.type('rchuat');
        cy.get('input[name="password"]').type("123456");
        cy.get('[data-test="signin-submit"]').should("have.not.attr", 'disabled');
        cy.get('input[name="username"]').clear();
        cy.get('[data-test="signin-submit"]').should("have.attr", 'disabled');
        cy.get('[data-test="signin-username"]').should("contain", "Username is required");
    });

    //test empty invalid username input
    it("show invalid username error message", function () {
        cy.get('input[name="username"]').type('rch');
        cy.get('input[name="password"]').type("123456");
        cy.get('[data-test="signin-submit"]').should("have.not.attr", 'disabled');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should("contain", "Username or password is invalid");
    });


    //test empty password input
    it("show block sigin", function () {
        var passwordInput = cy.get('input[name="password"]');
        cy.get('input[name="username"]').type("rchuat");
        passwordInput.type("123456");
        cy.get('[data-test="signin-submit"]').should("have.not.attr", 'disabled');
        passwordInput.clear();
        cy.get('[data-test="signin-submit"]').should("have.attr", 'disabled');
    });

    //test incorrect length password input
    it("show password error message", function () {
        var passwordInput = cy.get('input[name="password"]');
        cy.get('input[name="username"]').type("rchuat");
        passwordInput.type("123");
        cy.get('[data-test="signin-submit"]').should("have.attr", 'disabled');
        //cy.get('[id="password-helper-text"]').should("contain", 'Password must contain at least 4 characters');

    });
    
    //test incorrect password input
    it("show invalid password error message", function () {
        cy.get('input[name="username"]').type('rchuat');
        cy.get('input[name="password"]').type("1234567");
        cy.get('[data-test="signin-submit"]').should("have.not.attr", 'disabled');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should("contain", "Username or password is invalid");
    });

    //remember me
    it("remember me", function () {
        cy.get('input[name="username"]').type('rchuat');
        cy.get('input[name="password"]').type("123456");
        cy.get('input[name="remember"]').check();
        cy.get('[data-test="signin-submit"]').click();
        //quit
        cy.location('pathname').should('eq', '/');
        cy.go('back');
        cy.location('pathname').should('eq', '/signin');
        cy.location('pathname').should('eq', '/');


    });

});