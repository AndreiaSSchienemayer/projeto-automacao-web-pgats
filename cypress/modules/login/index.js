// ...existing code...
import { faker } from '@faker-js/faker'
import { getRandonEmail } from '../../support/helprs'

class Login {
    preencherFormularioDePreCadastro() {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const email = getRandonEmail()

        cy.get('[data-qa="signup-name"]').clear().type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').clear().type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDeLogin(user, pass) {
        cy.get('input[data-qa="login-email"]').clear().type(user)
        cy.get('input[data-qa="login-password"]').clear().type(pass, { log: false })
        cy.contains('button', 'Login').click()
    }

    registrarComEmailJaEmUso(){
        cy.get('[data-qa="signup-name"]').type(('Tester QA'))
        cy.get('[data-qa="signup-email"]').type('andreia@andreia.com')
        cy.get('input[data-qa="login-password"]').type('123456')
        cy.contains('button','Signup').click()
    }
    
}

export default new Login()
