const constantes = require('../constantes');

export class HomePage {
    
    constructor() {
        this.onlineShopLink = '[id="onlineshoplink"]';
    };

    clickonlineShop() {
        cy.get(this.onlineShopLink,{timeout: constantes.TIMEOUT}).click();
    };
};