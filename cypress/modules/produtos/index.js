class ListaProdutos {
    acessarListaDeProdutos() {
        cy.contains(/Products/i).should('exist')
        cy.get('a[href="/products"]', { timeout: 10000 }).click()
        cy.url().should('include', '/products')
        cy.contains('All Products', { timeout: 10000 }).should('be.visible')
        cy.contains('View Product', { timeout: 10000 }).should('exist')
        cy.contains('View Product').first().click()
        cy.url({ timeout: 10000 }).should('include', '/product_details')
    }

    procurarProdutos(termo = 'T-Shirt') {
        cy.get('a[href="/products"]', { timeout: 10000 }).click()
        cy.url().should('include', '/products')
        cy.contains('All Products', { timeout: 10000 }).should('be.visible')        
        cy.get('#search_product', { timeout: 10000 }).should('exist').clear().type(termo)
        cy.get('button#submit_search, button[type="submit"]').then($btn => {
            if ($btn && $btn.length) {
                cy.wrap($btn.first()).click()
            } else {
                cy.get('#search_product').type('{enter}')
            }
        })
        cy.contains(/Searched Products|SEARCHED PRODUCTS/i, { timeout: 10000 }).should('exist')
    }

    listaProdutos() {
        return this.procurarProdutos()
    }
}

export default new ListaProdutos()