/// <reference types="cypress" />
import userData from '../fixtures/example.json'
import userDataContact from '../fixtures/contac_us_data.json'
import {
    getRandomNumber,
    getRandonEmail  
} from '../support/helprs.js'
import { createRandomUser } from '../support/helprs.js';
import { faker } from '@faker-js/faker';
//import {navegarParaLogin} from '../modules/menu'
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import contato from '../modules/contato';
import { preencherFormularioDePreCadastro } from '../modules/login'
import listaProdutos from '../modules/produtos';

describe('Trabalho Final de Conclusão da Disciplina de Automação na Camada Web', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/')
        menu.navegarParaLogin()        
    })

    it('Test Case 1: Registrar Usuário', () => {
        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDeCadastroCompleto()
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')        
        cy.get('[data-qa="continue-button"]').click()
        cy.contains('Logged in as')
    });

    it('Test Case 2: Logar com usuário, email e senha corretos', () => {
    login.preencherFormularioDeLogin(userData.user, userData.password)
    
    cy.get('i.fa-user', { timeout: 10000 }).parent().should('contain', userData.name)
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible')
    cy.get(':nth-child(10) > a', { timeout: 10000 })
    .should('be.visible')
    .and('contain', `Logged in as ${userData.name}`)
    cy.contains('b', userData.name).should('be.visible')
    });

    it('Test Case 3: Login com usuário, email e senha incorretos', () => {
        login.preencherFormularioDeLogin(userData.user, '1234')
        cy.contains('Your email or password is incorrect!').should('be.visible')        
    });

    it('Test Case 4: Fazer logout do usuário', () => {
        login.preencherFormularioDeLogin(userData.user, userData.password)
        cy.contains('Logged in as').should('be.visible')
        menu.efetuarLogout()
        cy.contains('Signup / Login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain','Signup / Login')
    });

    it('Test Case 5: Registrar usuário com email já em uso', () => {
        login.registrarComEmailJaEmUso()
        cy.contains('Email Address already exist!').should('be.visible')    
    });       

    it('Test Case 6: Enviar um formulário de contato com upload de arquivo', () => {
        contato.enviarFormularioDeContatoComUploadDeArquivo()
        cy.get('.status').should('be.visible')
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')
    })

    it('Test Case 8: Verificar todos os produtos e a página de detalhes do produto', () => {
        listaProdutos.acessarListaDeProdutos()
        cy.get('.product-information, .product-details, .product-info', { timeout: 10000 })
        .first()
        .as('info')
        cy.get('@info').find('h1, h2').first().should('be.visible')               
        cy.get('@info').contains(/Category/i).should('exist')                       
        cy.get('@info').contains(/Availability/i).should('exist')                   
        cy.get('@info').contains(/Condition/i).should('exist')                      
        cy.get('@info').contains(/Brand/i).should('exist')             
    });   

    it('Test Case 9: Pesquisar Produto', () => {
        listaProdutos.procurarProdutos('T-Shirt')
        const resultsSelector = '.features_items, .product-list, .products'
        cy.get(resultsSelector, { timeout: 10000 }).first().as('results')
        const expectedNames = [
            'Pure Cotton V-Neck T-Shirt',
            'Green Side Placket Detail T-Shirt',
            'Premium Polo T-Shirts'
        ]
        expectedNames.forEach(name => {
            cy.get('@results').contains(name, { timeout: 10000 }).should('be.visible')
            })
    });
    
    it('Test Case 10: Verificar assinatura na página inicial', () => {
        login.registrar();
        cy.contains(/you have been successfully subscribed|successfully subscribed|subscribed/i, { timeout: 10000 })
        .should('be.visible');
    }); 

    it.only('Test Case 15: Fazer pedido: Registre-se antes de finalizar a compra', () => {
        menu.navegarParaLogin();
        login.novoCadastro()
        cadastro.preencherFormularioDeCadastroCompleto()
        cy.get('[data-qa="continue-button"]').click()
        cy.get(':nth-child(10) > a', { timeout: 10000 })
        .should('be.visible')
        .and('contain', `Logged in as ${userData.name}`)
        cy.contains('b', userData.name).should('be.visible')

        cy.get('a[href="/products"]').click()

        cy.get('[data-product-id="1"]').first().within(() => {
        cy.contains(/add to cart/i).click()
        })

        
        cy.get('body').then($body => {
        const $continue = $body.find('button, a').filter((i, el) => /continue shopping/i.test(Cypress.$(el).text()))
        if ($continue.length) {
            cy.wrap($continue.first()).click()
        } else {
            cy.log('Continue Shopping não encontrado — possível redirecionamento automático')
        }
        })

        cy.get('[data-product-id="4"]').first().within(() => {
        cy.contains(/add to cart/i).click()
        })

        cy.get('body').then($body => {
        const $continue = $body.find('button, a').filter((i, el) => /continue shopping/i.test(Cypress.$(el).text()))
        if ($continue.length) {
            cy.wrap($continue.first()).click()
        } else {
            cy.log('Continue Shopping não encontrado — possível redirecionamento automático')
        }
        })

        cy.get('a[href="/view_cart"]', { timeout: 10000 }).first().click()
        cy.url().should('include', '/view_cart')

        cy.contains(/Proceed To Checkout/i, { timeout: 10000 }).first().click()

        cy.get('.cart_info, .table-condensed, .cart_description', { timeout: 10000 }).should('be.visible')
        const expectedNames = ['Blue Top', 'Stylish Dress']
        expectedNames.forEach(name => {
        cy.get('.cart_info, .table-condensed, .cart_description')
            .contains(name, { timeout: 10000 })
            .should('be.visible')
        })

        cy.get('[class="form-control"]').type(('Está tudo correto'))
        cy.contains(/Place Order/i, { timeout: 10000 }).first().click()

        cy.get('[data-qa="signup-name"]').type(('Andreia'))
            cy.get('[name="name_on_card"]').type('Andreia S')
            cy.get('[data-qa="card-number"]').type('5486792674368117')
            cy.get('data-qa="cvc"]').type('123')
            cy.get('name="expiry_month"]').type('11')
            cy.get('data-qa="expiry-year"]').type('2026')
            cy.contains('button','Pay and Confirm Order').click()   
});


