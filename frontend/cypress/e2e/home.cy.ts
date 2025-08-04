describe('Home - E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir o formulário de boas-vindas', () => {
    cy.contains('Olá, seja bem-vindo').should('exist');
    cy.get('input[name="nome"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('deve salvar o nome e navegar para clientes', () => {
    cy.get('input[name="nome"]').type('Jusan');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/clientes');
    cy.window().then(win => {
      expect(win.localStorage.getItem('nome')).to.eq('Jusan');
    });
  });
});