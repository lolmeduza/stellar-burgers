import { baseURL } from './baseUrl';

describe('проверяем order', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(baseURL);
  });

  it('open modal with ingredient', function () {
    cy.contains('MOCK Краторная булка N-200i').click();
    cy.contains('Детали ингридиента').should('exist');
    cy.get('#modals').contains('MOCK Краторная булка N-200i').should('exist');
  });

  it('close modal with button', function () {
    cy.contains('MOCK Краторная булка N-200i').click();
    cy.contains('Детали ингридиента').should('exist');

    cy.get('[data-cy=close-modal]').click();
    cy.get('#modals')
      .contains('MOCK Краторная булка N-200i')
      .should('not.exist');
  });

  it('close modal with overlay', function () {
    cy.contains('MOCK Краторная булка N-200i').click();
    cy.contains('Детали ингридиента').should('exist');
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.get('#modals')
      .contains('MOCK Краторная булка N-200i')
      .should('not.exist');
  });
});
