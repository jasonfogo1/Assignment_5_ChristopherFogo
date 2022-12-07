class CheckoutOverviewPage {
    get prodPrice() {
        return ('.inventory_item_price');
    }
    get itemTotal() {
        return ('.summary_subtotal_label');
    }
    get totalTax() {
        return ('.summary_tax_label');
    }
    get orderTotal() {
        return ('.summary_total_label');
    }
    get btnFinish() {
        return ('#finish');
    }

}
export default new CheckoutOverviewPage()