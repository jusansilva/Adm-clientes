describe('Clientes Selecionados - E2E', () => {
  beforeEach(() => {
    // Simula clientes selecionados no localStorage
    window.localStorage.setItem('clientesSelecionados', JSON.stringify([1, 2]));
    cy.visit('/clientes/selecionado');
  });

  it('deve exibir o título correto', () => {
    cy.contains('Clientes Selecionados:').should('exist');
  });

  it('deve exibir os cards dos clientes selecionados', () => {
    cy.get('.grid > div').should('have.length.greaterThan', 0);
    cy.get('.grid > div').first().contains('Salário: R$');
    cy.get('.grid > div').first().contains('Empresa: R$');
  });

  it('deve limpar os clientes selecionados ao clicar no botão', () => {
    cy.contains('Limpar clientes selecionados').click();
    cy.get('.grid > div').should('have.length', 0);
    cy.window().then(win => {
      expect(win.localStorage.getItem('clientesSelecionados')).to.be.null;
    });
  });
});