
import { faker } from '@faker-js/faker'

class Cadastro{
    preencherFormularioDeCadastroCompleto(){ 
        cy.get('input[type=radio]').check('Mrs')
        cy.get('input#password').type('123456',{log:false})//exemplo usando id do seletor, veja que usa o # antes do nome. O log:false server para ocultar a senha que é digitada (mostra as bolinhas pretas).
        //para comboboxes ou selects -> usar o comando select
        cy.get('select[data-qa=days]').select('21')//aqui foi usado o selector data-qa=days, mas uma exemplo de seletor, e foi selecionado o dia com o valor 21
        cy.get('select[data-qa=months]').select('November')//aqui foi selecionado considerando o texto do objeto.
        cy.get('select[data-qa=years]').select('1988')
        //radio button ou checkboxes -> usa o comando check
        cy.get('input[type="checkbox"]#newsletter').check()
        cy.get('input[type="checkbox"]#optin').check()
        //cy.get('input#first_name').type(firstName) // como declarei as variaveis acima, posso só chamar a variavel aqui. 
        cy.get('input#first_name').type(faker.person.firstName())
        //cy.get('input#last_name').type(lastName) // como declarei as variaveis acima, posso só chamar a variavel aqui. 
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`Pgats ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').type(faker.location.city())
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')  
        //Act
        cy.get('[data-qa="create-account"]').click()
        //Assert
        //OBS: É comum ter mais de uma asserção para garantir que o teste passou, no exemplo abaixo por exemplo adicionamos 3 asserções.
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')
        }        
}

export default new Cadastro()