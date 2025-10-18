import { faker } from '@faker-js/faker'
import { getRandonEmail, getRandomNumber } from '../../support/helprs'

class Menu{
    navegarParaLogin(){    
    cy.get('a[href="/login"]').click()
    }

efetuarLogout(){
    cy.get('a[href="/logout"]').click()   
} 

}


export default new Menu();
