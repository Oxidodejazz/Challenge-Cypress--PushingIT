export class CheckoutPage {
    
    constructor() {
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
        this.purchaseButton = "Purchase";
    };

    escribirFirstName(nombre) {
        cy.get(this.firstNameInput).type(nombre);
    };

    escribirLastName(apellido) {
        cy.get(this.lastNameInput).type(apellido);
    };

    escribirNumeroTarjeta(numeroTarjeta) {
        cy.get(this.cardNumberInput).type(numeroTarjeta);
    };

    clickPurchaseButton() {
        cy.contains(this.purchaseButton).click();
    };
};