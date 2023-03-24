/// <reference types="cypress" />

const { HomePage } = require('../support/pages/homePage');
const { ProductsPage } = require('../support/pages/productsPage');
const { ShoppingCartPage } = require('../support/pages/shoppingCartPage');
const { CheckoutPage } = require('../support/pages/checkoutPage');
const { ReciptPage } = require('../support/pages/reciptPage');

describe('Desafío Final - Torres Gonzalo - PushingIT', () => {
    
    const username = "gonzalo-torres";
    const password = "123456!";
    const gender = "Male";
    const day = "3";
    const month = "April";
    const year = "1981";
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const reciptPage = new ReciptPage();
    let productosData;
    let checkoutData;

    before("Crear usuario, loggear y cargar fixtures", () => {
       
        cy.fixture('fixtureProductos').then(data => {
            productosData = data;
        });
        cy.fixture('fixtureCheckout').then(data => {
            checkoutData = data;
        });
        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body: {
                username: username,
                password: password,
                gender: gender,
                day: day,
                month: month,
                year: year
            },
        }).then(response => {
            expect(response.status).equal(200);
            cy.request({
                url: 'https://pushing-it.onrender.com/api/login',
                method: 'POST',
                body: {
                    username: username,
                    password: password
                },
            }).then(response => {
                expect(response.status).equal(200);
                localStorage.setItem('user',response.body.user.username);
                localStorage.setItem('token',response.body.token);                                
            });
        }); 
    });
    
    it('Test Unico', () => {
        
        cy.visit('');
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
        shoppingCartPage.clickGoToCheckoutButton();
        checkoutPage.escribirFirstName(checkoutData.nombre);
        checkoutPage.escribirLastName(checkoutData.apellido);
        checkoutPage.escribirNumeroTarjeta(checkoutData.numeroTarjeta);
        checkoutPage.clickPurchaseButton();
        reciptPage.getname().should('contain',(`${checkoutData.nombre} ${checkoutData.apellido}`));
        reciptPage.getNombreProductoAgregado(productosData.producto1.nombre).should('have.text',productosData.producto1.nombre);
        reciptPage.getNombreProductoAgregado(productosData.producto2.nombre).should('have.text',productosData.producto2.nombre);
        reciptPage.getCreditCardNumber().should('have.text',checkoutData.numeroTarjeta);
        reciptPage.getTotalPrice().should('contain',(`$${productosData.producto1.precio + productosData.producto2.precio}`));
    });

    after('Borrar usuario', () =>{
        
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: 'DELETE',
        }).then(response => {
            expect(response.status).equal(200);
        });
    });
});
