export class HomePage {
    
    constructor() {
        this.onlineShopLink = '[id="onlineshoplink"]';
    };

    clickonlineShop() {
        cy.get(this.onlineShopLink).click();
    };
};