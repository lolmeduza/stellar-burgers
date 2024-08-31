describe('проверяем order', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    cy.intercept('GET', 'api/orders', { fixture: 'user.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('my-powerful-refresh-token')
    );
    cy.setCookie('accessToken', 'my-powerful-access-token');
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('order burger', function () {
    const button = cy.get(`[data-cy=${1}]`);
    button.click({ multiple: true });

    cy.get('[data-cy=make-order]').click();

    // cy.get('[date-cy=]')
  });
});
