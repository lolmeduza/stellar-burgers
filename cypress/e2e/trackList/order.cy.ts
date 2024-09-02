import { baseURL } from './baseUrl';

describe('проверяем order', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('my-powerful-refresh-token')
    );
    cy.setCookie('accessToken', 'my-powerful-access-token');
    cy.visit(baseURL);
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('order burger', function () {
    const button = cy.get(`[data-cy=${1}]`);
    button.click({ multiple: true });

    cy.get('[data-cy=make-order]').click();

    cy.get('[data-cy=order-number]').contains('123456').should('exist');

    cy.get('[data-cy=close-modal]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]')
      .contains('MOCK Флюоресцентная булка R2-D3 (верх)')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('MOCK Флюоресцентная булка R2-D3 (низ)')
      .should('not.exist');
  });
});
