export class RegisterPage {
    
    constructor() {
        this.iniciarSesionLink = '#registertoggle';
    };

    clickIniciarSesion() {
        cy.get(this.iniciarSesionLink).dblclick();
    };
};

