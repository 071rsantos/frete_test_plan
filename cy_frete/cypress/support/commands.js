Cypress.Commands.add("fillValue", (values) => {
    cy.fixture('valores').then((valores) => {
      const valor = valores[values];

      cy.get('#valorEntrega').clear().type(valor.value);

    })
})