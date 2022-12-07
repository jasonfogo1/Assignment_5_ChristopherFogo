class ProductsPage {
    get btnProdAdd() {
        return ('#add-to-cart-sauce-labs-backpack');
    }
    get badge() {
        return ('.shopping_cart_badge');
    }
    get btnCart() {
        return ('#shopping_cart_container');
    }
    get title() {
        return ('.title');
    }
    get prodName() {
        return ('.inventory_item_name');
    }
    get prodPrice() {
        return ('.inventory_item_price');
    }
    get selectSort() {
        return ('.product_sort_container')
    }


    // addToCart(){
    //     cy.get(this.btnProdAdd).click();
    // }
    addToCart(prodName) {

        prodName = `#add-to-cart-${prodName.toLowerCase().replaceAll(' ', '-')}`;

        cy.get(prodName).click();
    }
    removeFromCart(prodName) {

        prodName = `#remove-${prodName.toLowerCase().replaceAll(' ', '-')}`;

        cy.get(prodName).click();
    }
    getProductNames() {                          //Function to get all product names on the product page
        let products = [];
        cy.get(this.prodName).each(($elem, index) => {
            products[index] = $elem.text();
        })
        return products;
    }
    getProductPrices() {                          //Function to get all product names on the product page
        let prices = [];
        cy.get(this.prodPrice).each(($elem, index) => {
            prices[index] = $elem.text().replaceAll('$', '');
            cy.log('price' + prices[index]);
        })
        return prices;
    }
}
export default new ProductsPage()