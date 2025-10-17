import { faker } from '@faker-js/faker'
import { getRandonEmail } from '../../support/helprs'

class Contato {
    enviarFormularioDeContatoComUploadDeArquivo() {
        cy.get('a[href*="contact"]').click()
        cy.fixture('example.json').then((data) => {
        cy.get('[data-qa="name"]').clear().type(data.name)
        cy.get('[data-qa="email"]').clear().type(data.email)
        cy.get('[data-qa="subject"]').clear().type(data.subject)
        cy.get('[data-qa="message"]').clear().type(data.body)

        // upload (usando fixture)
        cy.fixture('imagem-exemplo.png', 'base64').then(fileContent => {
        cy.get('[name="upload_file"]').selectFile({
        contents: Cypress.Blob.base64StringToBlob(fileContent),
        fileName: 'imagem-exemplo.png',
        mimeType: 'image/png'
        })
    })

    cy.get('[data-qa="submit-button"]').click()
    })
}
}

export default new Contato()
