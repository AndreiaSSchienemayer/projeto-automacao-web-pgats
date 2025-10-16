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
import { preencherFormularioDePreCadastro } from '../modules/login'




// describe / context - suite ou conjunto de testes em um mesmo arquivo
// it - representa um teste dentro de um bloco ou conjunto de testes

//Resumo: Formas de fazer a busca: 
//TAG           h1, div, button, input
//ID            #city (usar o # para indicar que é id)
//CLASSE        .form-control (indicada através do .)
//ATRIBUTO      [data-qa=city] (para o atributo usar o atributo e o valor)
//É possível mesclar também, por exemplo, usar: h.form-control ou input#city, neste caso mesclei a tag com a classe. 

//describe -> Automation Exercise
//  it -> Cadastrar um usuário
//  it -> Teste ABCD

//Triplo A - Arrange (acessar), Act (ação principal que é finalizar o cadastro), Assert (fazer as validações)

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/')
        //cy.get('a[href="/login"]').click()
        menu.navegarParaLogin()
        //navegarParaLogin()// usando o nome do módulo antes conforme linha acima fica mais visivel ainda de onde vem tal informação. 
    })

    it('Exemplos de logs', () => {
        cy.log('Step 1 :: Pgats Automacao Web Cy Log')
        cy.log('Step 2 :: Pgats Automacao Web Cy Log')
        cy.log(`getRandomNumber:${getRandomNumber()}`)
        cy.log(`getRandomMail:${getRandonEmail()}`)
        cy.log(`Nome do usuário: ${userData.name}`)
        cy.log(`Email do usuário: ${userData.email}`)
        cy.log(`Dog Breed: ${faker.animal.dog()}`)
        cy.fixture('imagem-exemplo.png').as('imagem')
        cy.get('[name="upload_file"]').selectFile('@imagem')
        console.log(`Pgats Automação Web Console Log`)
    });

    it('Test Case 1: Register User', () => {
        login.preencherFormularioDePreCadastro()
        //preencherFormularioDePreCadastro() Usando classe conforme exemplo da linha acima fica mais legível.        
        cadastro.preencherFormularioDeCadastroCompleto()
        //Asserções é indicado manter no arquivo de testes mesmo. 
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')        
        cy.get('[data-qa="continue-button"]').click()
        // Verifica se aparece o texto "Logged in as" na página
        cy.contains('Logged in as')
    });

    it('Test Case 2: Login User with correct email and password', () => {
    login.preencherFormularioDeLogin(userData.user, userData.password)
    //const nomeDoUsuario = userData.name

    cy.get('i.fa-user', { timeout: 10000 }).parent().should('contain', userData.name)
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible')
    cy.get(':nth-child(10) > a', { timeout: 10000 })
    .should('be.visible')
    .and('have.text', `Logged in as ${userData.name}`)
    cy.contains('b', userData.name).should('be.visible')
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        login.preencherFormularioDeLogin(userData.user, '1234')
        cy.contains('Your email or password is incorrect!').should('be.visible')        
    });


    it.only('Test Case Test Case 4: Logout User', () => {
        login.preencherFormularioDeLogin(userData.user, userData.password)
        cy.contains('Logged in as').should('be.visible')
        menu.efetuarLogout()
        cy.contains('Signup / Login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain','Signup / Login')
    });


    it('Test Case Test Case 5: Register User with existing email', () => {
        cy.get('[data-qa="signup-name"]').type(('Tester QA'))
        cy.get('[data-qa="signup-email"]').type('andreia@andreia.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Signup').click()
        cy.contains('Email Address already exist!').should('be.visible')    
    });    
    

    it('Enviar um formulário de contato com upload de arquivo', () => {
        //cy.visit('https://www.automationexercise.com/')
        cy.get('a[href*=contact]').click()
        cy.get('[data-qa="name"]').type(userDataContact.name)
        cy.get('[data-qa="email"]').type(userDataContact.email)
        cy.get('[data-qa="subject"]').type(userDataContact.subject)
        cy.get('[data-qa="message"]').type(userDataContact.yourmessage)
        
        cy.fixture('contac_us_data.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
        //Assert
        cy.get('.status').should('be.visible')
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')    
    }); 
    
});


