describe('CT02 - Validar campo Região', () => {


    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/src/index.html')
    })


    it('TC01 - Validar ERRO sem selecionar região', () => {
        cy.fillValue('fullFreteValue');
        cy.get('#calcularBtn').click();
        cy.get('#erro').should('be.visible')
        .and('contain', 'Selecione uma região');
    })

    it('TC02 - Validar Sucesso com região selecionada', () => {
        cy.fillValue('fullFreteValue');
        cy.get('#regiao').select('Nordeste');
        cy.get('#calcularBtn').click();
        cy.get('#resultado').should('be.visible')
        .and('contain', 'Valor do Frete: R$ 18,00');
    })


})