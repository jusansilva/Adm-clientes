describe('Clientes - E2E', () => {
  beforeEach(() => {
    cy.visit('/clientes');
  });

  it('deve exibir a lista de clientes', () => {
    cy.contains('clientes encontrados:');
    cy.get('.grid > div').should('have.length.greaterThan', 0);
  });

  it('deve abrir o modal de criação de cliente', () => {
    cy.contains('Criar cliente').click();
    cy.contains('Criar Cliente');
    cy.get('input[placeholder="Digitar Nome"]').should('exist');
  });

  it('deve selecionar e desselecionar um cliente', () => {
    cy.get('.grid > div').first().within(() => {
      cy.get('svg').first().click(); 
      cy.get('svg').first().click(); 
    });
  });

  it('deve abrir o modal de exclusão', () => {
    cy.get('.grid > div').first().within(() => {
      cy.get('svg').eq(2).click(); 
    });
    cy.contains('Excluir cliente:');
    cy.contains('Excluir cliente').click();
  });
});