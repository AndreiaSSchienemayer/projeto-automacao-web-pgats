/// <reference types="cypress" />
import userData from '../fixtures/example.json'
import userDataContact from '../fixtures/contac_us_data.json'
import {
    getRandomNumber     
} from '../support/helprs.js'
import { createRandomUser } from '../support/helprs.js';
import { faker, fakerPT_BR } from '@faker-js/faker';
import { faker } from '@faker-js/faker';
import 'cypress-xpath';

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
    // Arrange
        const timestamp = new Date().getTime()
        const user = createRandomUser();

        cy.xpath('//input[@data-qa="signup-name"]').type(faker.internet.username());
        cy.xpath('//input[@data-qa="signup-email"]').type(faker.internet.email());
        cy.xpath('//button[contains(text(),"Signup")]').click();
        cy.xpath('//input[@type="radio" and @value="Mrs"]').check();
        cy.xpath('//input[@id="password"]').type('123456', { log: false });
        cy.xpath('//select[@data-qa="days"]').select('21');
        cy.xpath('//select[@data-qa="months"]').select('November');
        cy.xpath('//select[@data-qa="years"]').select('1988');
        cy.xpath('//input[@type="checkbox" and @id="newsletter"]').check();
        cy.xpath('//input[@type="checkbox" and @id="optin"]').check();
        cy.xpath('//input[@id="first_name"]').type('Bob');
        cy.xpath('//input[@id="last_name"]').type('Narciso Pipoca');
        cy.xpath('//input[@id="company"]').type('Pgats');
        cy.xpath('//input[@id="address1"]').type('Avenida Selenium, n 2004');
        cy.xpath('//select[@id="country"]').type('Canada');
        cy.xpath('//input[@id="state"]').type('California');
        cy.xpath('//input[@id="city"]').type('Los Angeles');
        cy.xpath('//input[@data-qa="zipcode"]').type('90001');
        cy.xpath('//input[@data-qa="mobile_number"]').type('111 222 333');
        // Act
        cy.xpath('//button[@data-qa="create-account"]').click();
        // Assert
        cy.url().should('includes', 'account_created');
        cy.xpath('//b[contains(text(),"Account Created!")]').should('be.visible');
        cy.xpath('//h2[@data-qa="account-created"]').should('have.text', 'Account Created!');
        cy.xpath('//button[@data-qa="continue-button"]').click();
        cy.contains('Logged in as');
    });

    it('Test Case 2: Login User with correct email and password', () => {
        cy.xpath('//input[@data-qa="login-email"]').type('andreia@andreia.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Login")]').click();
        cy.contains('Logged in as').should('be.visible');
        cy.xpath('//i[contains(@class,"fa-user")]').parent().should('contain','Andreia');
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.xpath('//input[@data-qa="login-email"]').type('andreia_errado@andreia.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Login")]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Test Case 4: Logout User', () => {
        cy.xpath('//input[@data-qa="login-email"]').type('andreia@andreia.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Login")]').click();
        cy.contains('Logged in as').should('be.visible');
        cy.xpath('//a[@href="/logout"]').click();
        cy.contains('Signup / Login');
    });


    it('Test Case 5: Register User with existing email', () => {
        cy.xpath('//input[@data-qa="signup-name"]').type('Tester QA');
        cy.xpath('//input[@data-qa="signup-email"]').type('andreia@andreia.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Signup")]').click();
        cy.contains('Email Address already exist!').should('be.visible');
    });  
    
    it('Enviar um formulário de contato com upload de arquivo', () => {
        cy.visit('https://www.automationexercise.com/contact_us');
        cy.xpath('//input[@data-qa="name"]').type(userDataContact.name);
        cy.xpath('//input[@data-qa="email"]').type(userDataContact.email);
        cy.xpath('//input[@data-qa="subject"]').type(userDataContact.subject);
        cy.xpath('//textarea[@data-qa="message"]').type(userDataContact.yourmessage);

        // Upload de arquivo (certifique-se que o plugin está instalado e importado)
        cy.get('input[type="file"]').attachFile('contac_us_data.json');

        cy.xpath('//button[@data-qa="submit-button"]').click();
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });

    it('Enviar um formulário de contato com upload de arquivo', () => {
        // cy.visit('https://www.automationexercise.com/')
        cy.xpath('//a[contains(@href,"contact")]').click();
        cy.xpath('//input[@data-qa="name"]').type(userDataContact.name);
        cy.xpath('//input[@data-qa="email"]').type(userDataContact.email);
        cy.xpath('//input[@data-qa="subject"]').type(userDataContact.subject);
        cy.xpath('//textarea[@data-qa="message"]').type(userDataContact.yourmessage);

        // Upload de arquivo usando cypress-file-upload
        cy.get('input[type="file"]').attachFile('contac_us_data.json');

        cy.xpath('//button[@data-qa="submit-button"]').click();
        cy.get('.status').should('be.visible');
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });
    
});


