class CheckoutInfoPage {
    get inputFirstname() {
        return ('#first-name')
    }
    get inputLastname() {
        return ('#last-name')
    }
    get inputPostalCode() {
        return ('#postal-code')
    }
    get btnContinue() {
        return ('#continue')
    }
    get errorMsg() {
        return ('.error-message-container.error')
    }
    enterInfo(fistname, lastname, postalCode) {
        cy.get(this.inputFirstname).type(fistname);
        cy.get(this.inputLastname).type(lastname);
        cy.get(this.inputPostalCode).type(postalCode);
        cy.get(this.btnContinue).click();
    }


}
export default new CheckoutInfoPage()