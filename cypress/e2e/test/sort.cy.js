/// <reference types="cypress" />
import LoginPage from '../PageObjects/login.page.js'
import ProductsPage from '../PageObjects/products.page.js'

describe('Sorting', () => {
    beforeEach(() => {
        cy.visit('/')
        LoginPage.login('standard_user', 'secret_sauce');
    })
    it('Sort products A-Z ', () => {
        let products = ProductsPage.getProductNames();// Passes list of all products
        cy.get(ProductsPage.selectSort).select('az');// Select sort A to Z
        cy.get(ProductsPage.prodName).each(($element, itemIndex) => {
            cy.log(products[itemIndex]);
            products.sort();
            expect($element.text()).equal(products[itemIndex]);
        })
    })
    it('Sort products Z-A ', () => {
        let products = ProductsPage.getProductNames()// Passes list of all products
        cy.get(ProductsPage.selectSort).select('za');// Select sort Z to A
        cy.get(ProductsPage.prodName).each(($element, itemIndex) => {
            products.sort().reverse();
            expect($element.text()).equal(products[itemIndex]);
        })
    })
    it('Sort products Low to High ', () => {
        let prices = ProductsPage.getProductPrices()// Passes list of all products
        cy.get(ProductsPage.selectSort).select('lohi');// Select sort low to high
        cy.get(ProductsPage.prodPrice).each(($element, itemIndex) => {
            prices.sort(function (a, b) { return a - b });
            expect($element.text()).equal('$' + prices[itemIndex]);
        })
    })
    it('Sort products High to Low ', () => {
        let prices = ProductsPage.getProductPrices()// Passes list of all products
        cy.get(ProductsPage.selectSort).select('hilo');// Select sort low to high
        cy.get(ProductsPage.prodPrice).each(($element, itemIndex) => {
            prices.sort(function (a, b) { return a - b }).reverse();
            expect($element.text()).equal('$' + prices[itemIndex]);
        })
    })
})