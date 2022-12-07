/// <reference types="cypress" />
import LoginPage from '../PageObjects/login.page.js'
import ProductsPage from '../PageObjects/products.page.js'
import CartPage from '../PageObjects/cart.page.js'

describe('Add to Cart', () => {
   beforeEach(() => {
      cy.visit('/')
      LoginPage.login('standard_user', 'secret_sauce');
   })
   it('Should Remove one item from cart', () => {
      cy.get(ProductsPage.title).should('contain', 'Products');
      let productName = 'Sauce Labs Bike Light';
      ProductsPage.addToCart(productName);
      cy.get(ProductsPage.badge).should('be.visible'); //assertions
      cy.get(ProductsPage.btnCart).click();
      CartPage.removeFromCart(productName);
      cy.get(CartPage.cartItems).should('not.exist');//assertions
   })

   it('Should Remove item from Product Page', () => {
      cy.get(ProductsPage.title).should('contain', 'Products');
      let productName = 'Sauce Labs Bike Light';
      ProductsPage.addToCart(productName);
      cy.get(ProductsPage.badge).should('be.visible'); //assertions
      ProductsPage.removeFromCart(productName);
      cy.get(ProductsPage.btnCart).click();
      cy.get(CartPage.cartItems).should('not.exist');//assertions
   })

})