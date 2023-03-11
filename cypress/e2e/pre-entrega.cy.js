/// <reference types="cypress" />

const { RegisterPage } = require('../support/pages/registerPage');
const { LoginPage } = require('../support/pages/loginPage');
const { HomePage } = require('../support/pages/homePage');
const { ProductsPage } = require('../support/pages/productsPage');
const { ShoppingCartPage } = require('../support/pages/shoppingCartPage');

describe('Pre-Entrega - Torres Gonzalo - PushingIT', () => {
    let loginData;
    let productosData;
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();

    before("Before", () => {
        cy.fixture('fixtureLogin').then(data1 => {
        loginData = data1;
        });
        cy.fixture('fixtureProductos').then(data2 => {
        productosData = data2;
        });
    });

    it('Test Unico', () => {
        cy.visit('');
        registerPage.clickIniciarSesion();
        loginPage.login(loginData.login.usuario,loginData.login.contrasena);
        homePage.clickonlineShop();
        productsPage.agregarProducto(productosData.producto1.nombre);
        productsPage.agregarProducto(productosData.producto2.nombre);
        productsPage.clickGoToShoppingCart();
        shoppingCartPage.getNombreProductoAgregado(productosData.producto1.nombre).should('have.text',productosData.producto1.nombre);
        shoppingCartPage.getPrecioProductoAgregado(productosData.producto1.nombre,).should('have.text',`$${productosData.producto1.precio}`);
        shoppingCartPage.getNombreProductoAgregado(productosData.producto2.nombre).should('have.text',productosData.producto2.nombre);
        shoppingCartPage.getPrecioProductoAgregado(productosData.producto2.nombre).should('have.text',`$${productosData.producto2.precio}`);
        shoppingCartPage.clickShowTotalPriceButton();
        shoppingCartPage.getTotal().should('have.text',(productosData.producto1.precio + productosData.producto2.precio).toString());
    })
});






    