class CartPage {
    get btnRemoveProd() {
        return ('#remove-');
    }
    get cartItems() {
        return ('.inventory_item_name');
    }
    get btnCheckout() {
        return ('#checkout');

    }
    removeFromCart(prodName) {

        prodName = `#remove-${prodName.toLowerCase().replaceAll(' ', '-')}`;

        cy.get(prodName).click();
    }


}
export default new CartPage()