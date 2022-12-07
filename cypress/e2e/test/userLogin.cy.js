/// <reference types="cypress" />
import LoginPage from '../PageObjects/login.page.js'
import LoginData from './Data/login.data.js'

describe('CheckOut', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    LoginData.forEach((record) => {

        it('Should try to Login ' + record.user.replaceAll("_", " "), () => {
            LoginPage.login(record.user, record.password);
            cy.url().should('eq', record.url);

        })
    })
})