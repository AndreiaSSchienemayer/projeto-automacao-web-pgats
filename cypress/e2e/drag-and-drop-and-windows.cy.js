
describe('Drag and drop and windows', () =>{
    it('Multiplo Window',()=>{
        cy.visit('https://the-internet.herokuapp.com/windows')
        
        cy.contains('Click Here').invoke('removeAttr','target').click() //removeAttr usado para remover atributos

        cy.get('h3').should('have.text','New Window')
    });
    //cy.go('back') comando para clicar no botão Voltar a página.

    //cy.get('a[href="/windows/new"]').click() ---- ajustar -------
    //cy.get('h3').should('have.text','New Window ---- ajustar -------
});


describe('Drag and drop', () =>{
    it('Arrastar A para B', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')
        // DataTransfer nativo do browser; criar dentro do test
        
        const dataTransfer = new DataTransfer()

        // usar ids conhecidos da página
        cy.get('#column-a').trigger('dragstart', { dataTransfer })
        cy.get('#column-b').trigger('drop', { dataTransfer })

        // assert simples para verificar troca (ajuste conforme DOM real)
        cy.get('#column-a header').should('contain', 'B')
        cy.get('#column-b header').should('contain', 'A')
        });
    });