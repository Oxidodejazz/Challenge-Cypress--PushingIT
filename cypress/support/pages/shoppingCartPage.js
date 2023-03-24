export class ShoppingCartPage {
    
    constructor() {
        this.showTotalPriceButton = 'Show total price';
        this.price = '#price';
        this.goToCheckoutButton = "Go to Checkout"
    };

    getNombreProductoAgregado(producto) {
        return cy.xpath(`//p[text()='${producto}']`);
    };

    getPrecioProductoAgregado(producto) {
        return cy.xpath(`//p[text()='${producto}']//following-sibling::p[@id='productPrice']`);
    };

    getTotal() {
        return cy.get(this.price).children();
    };

    clickShowTotalPriceButton() {
        cy.contains(this.showTotalPriceButton).click();
    };

    clickGoToCheckoutButton() {
        cy.contains(this.goToCheckoutButton).click();
    };
};