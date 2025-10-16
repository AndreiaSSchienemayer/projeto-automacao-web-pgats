import { faker } from '@faker-js/faker'

class Menu{
    navegarParaLogin(){    
    cy.get('a[href="/login"]').click()
    }

efetuarLogout(){
    cy.get('a[href="/logout"]').click()   
} 

}


export default new Menu();
