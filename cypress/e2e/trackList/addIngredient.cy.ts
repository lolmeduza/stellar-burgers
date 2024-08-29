describe('проверяем ingredients', function () {
  it('hz', function () {
    cy.fixture('ingredients.json').then((json) => {
      cy.intercept('GET', 'api/ingredients', json);
      cy.visit('http://localhost:4000');

      const button = cy.get(`[data-cy=${1}]`);
      console.log(button);
      button.click({ multiple: true });
      console.log('kek');
    });
  });
});
