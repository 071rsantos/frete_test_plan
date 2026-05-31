describe('CT01 - Validar os valores', () => {

    beforeEach(() => {

        cy.visit('http://127.0.0.1:5500/src/index.html')

    })


    it('TC01 - Validar ERRO com valor negativo', () => {
        cy.fillValue('negativeValue');
        cy.get('#regiao').select('Norte');
        cy.get('#calcularBtn').click();
        cy.get('#erro').should('be.visible')
        .and('contain', 'Informe um valor de entrega válido');
    })

    it('TC02 - Validar ERRO com valor zero', () => {
        cy.fillValue('zeroValue');
        cy.get('#regiao').select('Sul');
        cy.get('#calcularBtn').click();
        cy.get('#erro').should('be.visible')
        .and('contain', 'Informe um valor de entrega válido');
    })

    it('TC03 - Validar Sucesso com valor positivo', () => {
        cy.fillValue('fullFreteValue');
        cy.get('#regiao').select('Sudeste');
        cy.get('#calcularBtn').click();
        cy.get('#resultado').should('be.visible')
        .and('contain', 'Valor do Frete: R$ 10,00');
    })

    it('TC04 - Validar Sucesso com valor para frete gratis', () => {
        cy.fillValue('freeFreteValue');
        cy.get('#regiao').select('Centro-Oeste');
        cy.get('#calcularBtn').click();
        cy.get('#resultado').should('be.visible')
        .and('contain', 'Valor do Frete: R$ 0,00');
    })

})