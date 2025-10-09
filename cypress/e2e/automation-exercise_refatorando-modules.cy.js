/// <reference types="cypress" />
import userData from '../fixtures/example.json'
import userDataContact from '../fixtures/contac_us_data.json'
import {
    getRandomNumber     
} from '../support/helprs.js'
import { createRandomUser } from '../support/helprs';
import { faker, fakerPT_BR } from '@faker-js/faker';

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
        cy.get('a[href="/login"]').click()
    })

    it.only('Test Case 1: Register User', () => {
        //Arange

        const timestamp = new Date().getTime()
        //cy.viewport(300, 1000) Para definir tamanho da tela para testar com mobile por exemplo, pode ser definido o tamanho manualmente conforme foi feito no exemplo ou pegar os
        //tamanhos já sugeridos.
        const user = createRandomUser();
        cy.get('[data-qa="signup-name"]').type(faker.internet.username());
        cy.get('[data-qa="signup-email"]').type(faker.internet.email());
        cy.contains('button','Signup').click()//exemplo clicando no botão
        //radio button ou checkboxes -> usa o comando check
        //cy.get('#id_gender1).check() Assim busca pelo id do radio button caso desejar
        cy.get('input[type=radio]').check('Mrs')
        cy.get('input#password').type('123456',{log:false})//exemplo usando id do seletor, veja que usa o # antes do nome. O log:false server para ocultar a senha que é digitada (mostra as bolinhas pretas).
        //para comboboxes ou selects -> usar o comando select
        cy.get('select[data-qa=days]').select('21')//aqui foi usado o selector data-qa=days, mas uma exemplo de seletor, e foi selecionado o dia com o valor 21
        cy.get('select[data-qa=months]').select('November')//aqui foi selecionado considerando o texto do objeto.
        cy.get('select[data-qa=years]').select('1988')
        //radio button ou checkboxes -> usa o comando check
        cy.get('input[type="checkbox"]#newsletter').check()
        cy.get('input[type="checkbox"]#optin').check()
        cy.get('input#first_name').type('Bob')
        cy.get('input#last_name').type('Narciso Pipoca')
        cy.get('input#company').type('Pgats')
        cy.get('input#address1').type('Avenida Selenium, n 2004')
        cy.get('select#country').type('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')  
        //Act
        cy.get('[data-qa="create-account"]').click()
        //Assert
        //OBS: É comum ter mais de uma asserção para garantir que o teste passou, no exemplo abaixo por exemplo adicionamos 3 asserções.
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text','Account Created!')
        cy.get('[data-qa="continue-button"]').click()
        // Verifica se aparece o texto "Logged in as" na página
        cy.contains('Logged in as')
    });

    it('Test Case 2: Login User with correct email and password', () => {
        cy.get('input[data-qa="login-email"]').type('andreia@andreia.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Login').click()
        cy.contains('Logged in as').should('be.visible')
        cy.get(`i.fa-user`).parent().should('contain','Andreia')        
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.get('input[data-qa="login-email"]').type('andreia_errado@andreia.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Login').click()
        cy.contains('Your email or password is incorrect!').should('be.visible')        
    });

    it('Test Case Test Case 4: Logout User', () => {
        cy.get('input[data-qa="login-email"]').type('andreia@andreia.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Login').click()
        cy.contains('Logged in as').should('be.visible')
        cy.get('a[href="/logout"]').click()
        cy.contains('Signup / Login')
    });


    it('Test Case Test Case 5: Register User with existing email', () => {
        cy.get('[data-qa="signup-name"]').type(('Tester QA'))
        cy.get('[data-qa="signup-email"]').type('andreia@andreia.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Signup').click()
        cy.contains('Email Address already exist!').should('be.visible')    
    });  
    
    it('Enviar um formulário de contato com upload de arquivo', () => { // minha resposta 
        cy.visit('https://www.automationexercise.com/contact_us')
        cy.get('[data-qa="name"]').type(userDataContact.name)
        cy.get('[data-qa="email"]').type(userDataContact.email)
        cy.get('[data-qa="subject"]').type(userDataContact.subject)
        cy.get('[data-qa="message"]').type(userDataContact.yourmessage)
        cy.get('[data-qa="submit-button"]').click()
        cy.contains('Submit').click()
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible')    
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


