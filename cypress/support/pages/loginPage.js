export class LoginPage {
    
    constructor() {
        this.usuarioInput = '#user';
        this.contraseñaInput = '#pass';
        this.loginButton = 'Log in';
    };

    login(usuario, contraseña) {
        cy.get(this.usuarioInput).type(usuario);
        cy.get(this.contraseñaInput).type(contraseña);
        cy.contains(this.loginButton).click();
    };
};