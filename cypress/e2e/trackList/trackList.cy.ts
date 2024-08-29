describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.fixture('ingredients.json').then((json) => {
      cy.intercept('GET', 'api/ingredients', json);
      cy.visit('http://localhost:4000');
    });
  });
});
