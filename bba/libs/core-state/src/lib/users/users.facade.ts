import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@bba/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from '@bba/core-data';

@Injectable()
export class UsersFacade {
  // private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(users);
  // currentUsers$ = this.usersSubject.asObservable();
  private selectedUserSubject: BehaviorSubject<User> = new BehaviorSubject(
    null
  );
  selectedUser$ = this.selectedUserSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UsersSelectors.getUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.getSelected));

  constructor(private store: Store, private usersService: UsersService) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UsersActions.init());
  }

  allUsers() {
    return this.usersService.all();
  }

  selectUser(selectedUser: User) {
    this.selectedUserSubject.next(selectedUser);
  }

  createUser(user: User) {
    this.usersService.create(user);
  }

  updateUser(user: User) {
    this.usersService.update(user);
  }

  deleteUser(user: User) {
    this.usersService.delete(user);
  }
}
