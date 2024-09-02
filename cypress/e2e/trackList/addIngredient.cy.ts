import { baseURL } from './baseUrl';

describe('проверяем ingredients', function () {
  it('hz', function () {
    cy.fixture('ingredients.json').then((json) => {
      cy.intercept('GET', 'api/ingredients', json);
      cy.visit(baseURL);

      const button = cy.get(`[data-cy=${1}]`);
      button.click({ multiple: true });
      cy.get('[data-cy=constructor-bun-top]')
        .contains('MOCK Флюоресцентная булка R2-D3 (верх)')
        .should('exist');
      cy.get('[data-cy=constructor-bun-bottom]')
        .contains('MOCK Флюоресцентная булка R2-D3 (низ)')
        .should('exist');
    });
  });
});
