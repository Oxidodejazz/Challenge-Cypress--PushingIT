const constantes = require('../constantes');

export class ReciptPage {
    
    constructor() {
        this.name = '#name';
        this.creditCard = '#creditCard';
        this.totalPrice = '#totalPrice';                
    };
       
    getname() {
        return cy.get(this.name,{timeout: constantes.TIMEOUT * 1.2});
    };

    getCreditCardNumber() {
        return cy.get(this.creditCard);
    };

    getTotalPrice() {
        return cy.get(this.totalPrice);
    };

    getNombreProductoAgregado(producto) {
        return cy.xpath(`//p[text()='${producto}']`);
    };
};