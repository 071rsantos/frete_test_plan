import {
  cenario_full,
  cenario_full_equals_200,
  cenario_half,
  cenario_free
} from '../../support/data';

describe('CT01 - Validar os valores de frete', () => {


    beforeEach(() => {

        cy.visit('http://127.0.0.1:5500/src/index.html')

    })

    cenario_full.forEach(({regiao, valor, frete}) => {
        it(`Validar o valor do frete cheio para a região ${regiao} abaixo de R$200,00`, () => {
            cy.fillValue(valor)
            cy.get('#regiao').select(regiao)
            cy.get('#calcularBtn').click()
            cy.get('#resultado').should('be.visible').and('contain', frete)
        })
    })
    cenario_full_equals_200.forEach(({regiao, valor, frete}) => {
        it(`Validar o valor do frete cheio para a região ${regiao} igual a R$200,00`, () => {
            cy.fillValue(valor)
            cy.get('#regiao').select(regiao)
            cy.get('#calcularBtn').click()
            cy.get('#resultado').should('be.visible').and('contain', frete)
        })
    })
    cenario_half.forEach(({regiao, valor, frete}) => {
        it(`Validar o valor do frete pela metade para a região ${regiao} abaixo de R$200,00`, () => {
            cy.fillValue(valor)
            cy.get('#regiao').select(regiao)
            cy.get('#calcularBtn').click()
            cy.get('#resultado').should('be.visible').and('contain', frete)
        })
    })

})