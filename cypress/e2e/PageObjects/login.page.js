class LoginPage {
    get inputUserName() {
        return ('#user-name');
    }
    get inputPassword() {
        return ('#password');
    }
    get btnLogin() {
        return ('#login-button');
    }

    login(username, password) {
        cy.get(this.inputUserName).type(username);
        cy.get(this.inputPassword).type(password);
        cy.get(this.btnLogin).click();
    }

}
export default new LoginPage()