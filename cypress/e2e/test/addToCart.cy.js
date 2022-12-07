/// <reference types="cypress" />
import LoginPage from '../PageObjects/login.page.js'
import ProductsPage from '../PageObjects/products.page.js'
import CartPage from '../PageObjects/cart.page.js'

describe('Add to Cart', () => {
   beforeEach(() => {
      cy.visit('/')
      LoginPage.login('standard_user', 'secret_sauce');
   })
   it('Should add one item to cart', () => {
      cy.get(ProductsPage.title).should('contain', 'Products');
      let productName = 'Sauce Labs Backpack';
      ProductsPage.addToCart(productName);
      cy.get(ProductsPage.badge).should('contain', '1'); //assertion
      cy.get(ProductsPage.btnCart).click();
      cy.get(CartPage.cartItems).should('contain', productName);//assertion
   })

   it('Should add multiple item to cart', () => {
      cy.get(ProductsPage.title).should('contain', 'Products');//assertion
      let productName1 = 'Sauce Labs Backpack';
      ProductsPage.addToCart(productName1);
      let productName2 = 'Sauce Labs Onesie'
      ProductsPage.addToCart(productName2);
      let productName3 = 'Sauce Labs Bike Light'
      ProductsPage.addToCart(productName3);
      cy.get(ProductsPage.badge).should('contain', '3'); //assertion
      cy.get(ProductsPage.btnCart).click();
      cy.get(CartPage.cartItems).should('contain', productName1);//assertion
      cy.get(CartPage.cartItems).should('contain', productName2);//assertion
      cy.get(CartPage.cartItems).should('contain', productName3);//assertion
   })

})