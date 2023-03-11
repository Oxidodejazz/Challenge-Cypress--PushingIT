export class ProductsPage {
    
    constructor() {
        this.closeButton = '#closeModal';
        this.goToShoppingCartButton = '#goShoppingCart';
    };

    agregarProducto(producto) {
        cy.contains(producto).siblings('button').click();
        cy.get(this.closeButton).click();
    };

    clickGoToShoppingCart() {
        cy.get(this.goToShoppingCartButton).click();
    };
};