describe('тест добавления игредиентов в конструктор', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    });

    it('добавить bun', () => {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=constructor-bun-1]')
            .contains('Ингредиент 1')
            .should('exist');
        cy.get('[data-cy=constructor-bun-2]')
            .contains('Ингредиент 1')
            .should('exist');
    });

    it('добавить main/sauce', () => {
        cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 2')
            .should('exist');
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 4')
            .should('exist');
    });
});

describe('тест работы модального окна', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    });

    it('открыть модалку', () => {
        cy.contains('Ингредиент 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('#modals')
            .contains('Ингредиент 1')
            .should('exist');
    });

    it('закрыть модалку по клику на крестик', () => {
        cy.contains('Ингредиент 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-cy=close-modal-button]').click();
        cy.contains('Детали ингредиента').should('not.exist');
    });
});

describe('тест создания заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
        cy.intercept('POST', 'api/orders', {fixture: 'post_order.json'}).as('postOrder');

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('testRefreshToken')
        );
        cy.setCookie('accessToken', 'testAccessToken')
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('добавить ингредиенты и создать заказ', () => {
        cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
        cy.get('[data-cy=order-button]').click();
        cy.get('[data-cy=order-button]').click();

        cy.wait('@postOrder')
            .its('request.body')
            .should('deep.equal', {
                ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0942", "643d69a5c3f7b9001cfa093c"]
            });

        cy.get('[data-cy=order-number]')
            .contains('123')
            .should('exist');
        cy.get('[data-cy=close-modal-button]').click();
        cy.get('[data-cy=order-number]').should('not.exist');
        
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 1')
            .should('not.exist');
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 2')
            .should('not.exist');
        cy.get('[data-cy=constructor-ingredients]')
            .contains('Ингредиент 4')
            .should('not.exist');
    });
});