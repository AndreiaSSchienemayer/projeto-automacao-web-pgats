
import { faker } from '@faker-js/faker'
import { getRandonEmail, getRandomNumber } from '../../support/helprs'

class carrinho {
    adicionandoProdutosAoCarrinho() {

cy.get('a[href="/products"]').click();

    cy.get('[data-product-id="1"]').first().within(() => {
        cy.contains(/add to cart/i).click();
    });

    cy.get('body').then($body => {
        const $continue = $body.find('button, a').filter((i, el) => /continue shopping/i.test(Cypress.$(el).text()));
        if ($continue.length) {
        cy.wrap($continue.first()).click();
        } else {
        cy.log('Continue Shopping não encontrado');
        }
    });

    cy.get('[data-product-id="4"]').first().within(() => {
        cy.contains(/add to cart/i).click();
    });

    cy.get('body').then($body => {
        const $continue = $body.find('button, a').filter((i, el) => /continue shopping/i.test(Cypress.$(el).text()));
        if ($continue.length) {
        cy.wrap($continue.first()).click();
        } else {
        cy.log('Continue Shopping não encontrado');
        }
    });
    }

    navegarParaCarrinho() {
        cy.get('a[href="/view_cart"]').first().click();
        cy.url().should('include', '/view_cart');
    }

    confirmandoPedido() {
        cy.contains(/Proceed To Checkout/i, { timeout: 10000 }).first().click();

        cy.get('.cart_info, .table-condensed, .cart_description', { timeout: 10000 }).should('be.visible');
        const expectedNames = ['Blue Top', 'Stylish Dress'];
        expectedNames.forEach(name => {
            cy.get('.cart_info, .table-condensed, .cart_description')
            .contains(name, { timeout: 10000 })
            .should('be.visible');
        }); 

        cy.get('.form-control').type('Está tudo correto');
        cy.contains(/Place Order/i, { timeout: 10000 }).first().click();
    }
    
    efetuandoPagamento(){
        cy.get('body', { timeout: 20000 }).then($body => {
            if ($body.find('[data-qa="signup-name"]').length) {
            cy.get('[data-qa="signup-name"]').type('Andreia');
            }
            if ($body.find('[name="name_on_card"]').length) {
            cy.get('[name="name_on_card"]').type('Andreia S');
            }
            if ($body.find('[data-qa="card-number"], input[name="card_number"], input[name="cardnumber"]').length) {
            cy.get('[data-qa="card-number"], input[name="card_number"], input[name="cardnumber"]').first().type('5486792674368117');
            }
            if ($body.find('[data-qa="cvc"], input[name="cvc"], input[name="cvv"]').length) {
            cy.get('[data-qa="cvc"], input[name="cvc"], input[name="cvv"]').first().type('123');
            }
            if ($body.find('[name="expiry_month"], [data-qa="expiry-month"]').length) {
            cy.get('[name="expiry_month"], [data-qa="expiry-month"]').first().type('11');
            }
            if ($body.find('[name="expiry_year"], [data-qa="expiry-year"]').length) {
            cy.get('[name="expiry_year"], [data-qa="expiry-year"]').first().type('2026');
            }
        });
    }
}

export default new carrinho ()
