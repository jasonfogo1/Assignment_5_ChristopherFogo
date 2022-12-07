/// <reference types="cypress" />
import LoginPage from '../PageObjects/login.page.js'
import ProductsPage from '../PageObjects/products.page.js'
import CartPage from '../PageObjects/cart.page.js'
import CheckoutInfoPage from '../PageObjects/checkoutInfo.page.js'
import CheckoutOverviewPage from '../PageObjects/checkoutOverview.page.js'
import CompletePage from '../PageObjects/complete.page.js'
describe('CheckOut', () => {
    beforeEach(() => {
        cy.visit('/')
        LoginPage.login('standard_user', 'secret_sauce');
    })
    it('Add check out info', () => {
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        cy.get(ProductsPage.badge).should('contain', '1'); //assertion
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        CheckoutInfoPage.enterInfo('jay', 'fogo', 70122);
        cy.get(CheckoutInfoPage.errorMsg).should('not.exist');
        cy.url().should('contain', 'checkout-step-two');

    })
    it('Should not proceed to order Overview without zip code', () => {      // Negative testing 
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        cy.get(ProductsPage.badge).should('contain', '1'); //assertion
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        cy.get(CheckoutInfoPage.inputFirstname).type('John');
        cy.get(CheckoutInfoPage.inputLastname).type('James');
        cy.get(CheckoutInfoPage.btnContinue).click();
        cy.get(CheckoutInfoPage.errorMsg).should('exist');

    })
    it('Should not proceed to order Overview without Lastname', () => {      // Negative testing 
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        cy.get(ProductsPage.badge).should('contain', '1'); //assertion
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        cy.get(CheckoutInfoPage.inputFirstname).type('John');
        cy.get(CheckoutInfoPage.inputPostalCode).type('1876');
        cy.get(CheckoutInfoPage.btnContinue).click();
        cy.get(CheckoutInfoPage.errorMsg).should('exist');

    })
    it('Should not proceed to order Overview without Firstname', () => {      // Negative testing 
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        cy.get(ProductsPage.badge).should('contain', '1'); //assertion
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        cy.get(CheckoutInfoPage.inputLastname).type('James');
        cy.get(CheckoutInfoPage.inputPostalCode).type('1876');
        cy.get(CheckoutInfoPage.btnContinue).click();
        cy.get(CheckoutInfoPage.errorMsg).should('exist');

    })

    it('Verify Order data for single item', () => {
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        cy.get(ProductsPage.badge).should('contain', '1'); //assertion
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        CheckoutInfoPage.enterInfo('jay', 'fogo', 70122);
        cy.get(CheckoutInfoPage.errorMsg).should('not.exist');
        cy.url().should('contain', 'checkout-step-two');
        let sum = 0
        cy.get(ProductsPage.prodPrice).each(($elem,) => {
            sum = sum + parseFloat($elem.text().replaceAll('$', ''))
        }).then(() => {
            cy.get(CheckoutOverviewPage.itemTotal).should('contain', sum);
            let tax = parseFloat(sum * 0.08).toFixed(2);
            cy.get(CheckoutOverviewPage.totalTax).should('contain', tax);
            cy.log(sum);
            let total = parseFloat(sum * 1.08).toFixed(2);
            cy.get(CheckoutOverviewPage.orderTotal).should('contain', total);
        })
    })
    it('Verify Order data for multiple item', () => {
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        let productName3 = 'Sauce Labs Bike Light'
        ProductsPage.addToCart(productName3);
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        CheckoutInfoPage.enterInfo('jay', 'fogo', 70122);
        cy.get(CheckoutInfoPage.errorMsg).should('not.exist');
        cy.url().should('contain', 'checkout-step-two');
        let sum = 0
        cy.get(ProductsPage.prodPrice).each(($elem,) => {
            sum = sum + parseFloat($elem.text().replaceAll('$', ''))
        }).then(() => {
            cy.get(CheckoutOverviewPage.itemTotal).should('contain', sum);
            let tax = parseFloat(sum * 0.08).toFixed(2);
            cy.get(CheckoutOverviewPage.totalTax).should('contain', tax);
            cy.log(sum);
            let total = parseFloat(sum * 1.08).toFixed(2);
            cy.get(CheckoutOverviewPage.orderTotal).should('contain', total);
        })
    })
    it('Complete Checkout single item', () => {
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        cy.get(ProductsPage.badge).should('contain', '1'); //assertion
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        CheckoutInfoPage.enterInfo('jay', 'fogo', 70122);
        cy.get(CheckoutInfoPage.errorMsg).should('not.exist');
        cy.url().should('contain', 'checkout-step-two');
        let sum = 0
        cy.get(ProductsPage.prodPrice).each(($elem,) => {
            sum = sum + parseFloat($elem.text().replaceAll('$', ''))
        }).then(() => {
            cy.get(CheckoutOverviewPage.itemTotal).should('contain', sum);
            let tax = parseFloat(sum * 0.08).toFixed(2);
            cy.get(CheckoutOverviewPage.totalTax).should('contain', tax);
            cy.log(sum);
            let total = parseFloat(sum * 1.08).toFixed(2);
            cy.get(CheckoutOverviewPage.orderTotal).should('contain', total);
        })
        cy.get(CheckoutOverviewPage.btnFinish).click();
        cy.get(CompletePage.pageTitle).should('contain', 'Checkout: Complete!');
    })
    it('Complete Checkout multiple items', () => {
        cy.get(ProductsPage.title).should('contain', 'Products');
        let productName = 'Sauce Labs Backpack';
        ProductsPage.addToCart(productName);
        let productName3 = 'Sauce Labs Bike Light'
        ProductsPage.addToCart(productName3);
        cy.get(ProductsPage.btnCart).click();
        cy.get(CartPage.cartItems).should('contain', productName);//assertion
        cy.get(CartPage.btnCheckout).click();
        cy.url().should('contain', 'checkout-step-one');
        CheckoutInfoPage.enterInfo('jay', 'fogo', 70122);
        cy.get(CheckoutInfoPage.errorMsg).should('not.exist');
        cy.url().should('contain', 'checkout-step-two');
        let sum = 0
        cy.get(ProductsPage.prodPrice).each(($elem,) => {
            sum = sum + parseFloat($elem.text().replaceAll('$', ''))
        }).then(() => {
            cy.get(CheckoutOverviewPage.itemTotal).should('contain', sum);
            let tax = parseFloat(sum * 0.08).toFixed(2);
            cy.get(CheckoutOverviewPage.totalTax).should('contain', tax);
            cy.log(sum);
            let total = parseFloat(sum * 1.08).toFixed(2);
            cy.get(CheckoutOverviewPage.orderTotal).should('contain', total);
        })
        cy.get(CheckoutOverviewPage.btnFinish).click();
        cy.get(CompletePage.pageTitle).should('contain', 'Checkout: Complete!');
    })
})