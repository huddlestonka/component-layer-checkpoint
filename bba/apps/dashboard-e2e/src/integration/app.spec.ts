import { getUserListItem } from '../support/app.po';

describe('dashboard', () => {
  beforeEach(() => cy.visit('/'));

  it('mat-list-item should display USERS', () => {
    getUserListItem().contains('USERS');
  });
});
