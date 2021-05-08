import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@bba/api-interfaces';
import { BehaviorSubject } from 'rxjs';

let users: User[] = [
  {
    id: '21789f40-b0fb-4aa6-8e88-376b4edfmnhy',
    title: 'Software Engineer',
    role: 'user',
    description: 'Pending',
    firstName: 'Kaleb',
    lastName: 'Huddleston',
    email: 'kaleb@cards.com',
    password: 'insecure',
    profilePic: 'https://s3.amazonaws.com/uifaces/faces/twitter/baires/128.jpg',
  },
  {
    id: '21789f40-b0fb-4aa6-8e88-376b4edf0ldd',
    title: 'Engineering Manager',
    role: 'manager',
    description: 'Pending.',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@cards.com',
    password: 'insecure',
    profilePic:
      'https://s3.amazonaws.com/uifaces/faces/twitter/teeragit/128.jpg',
  },
  {
    id: '21789f40-b0fb-4aa6-8e88-376b4edfkh84',
    title: 'Enterprise Developer',
    role: 'admin',
    description: 'Pending.',
    firstName: 'Timmy',
    lastName: 'Jackson',
    email: 'timmy@cards.com',
    password: 'insecure',
    profilePic:
      'https://s3.amazonaws.com/uifaces/faces/twitter/meelford/128.jpg',
  },
];

@Injectable()
export class UsersFacade {
  private mockUsersSubject: BehaviorSubject<User[]> = new BehaviorSubject(
    users
  );
  currentMockUsers$ = this.mockUsersSubject.asObservable();
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UsersSelectors.getUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UsersActions.init());
  }

  createUser(user: User) {
    const newUser = Object.assign({}, user, { id: uuidv4() });
    let updatedUsers: User[];
    this.currentMockUsers$.subscribe((x) =>
      x.forEach((u) => updatedUsers.push(u))
    );
    updatedUsers.push(newUser);
    this.mockUsersSubject.next(updatedUsers);
  }

  updateUser(user: User) {
    let updatedUsers: User[];
    this.currentMockUsers$.subscribe((x) =>
      x.forEach((u) => updatedUsers.push(u))
    );
    updatedUsers.push(user);
    this.mockUsersSubject.next(updatedUsers);
  }

  deleteUser(user: User) {
    let updatedUsers: User[];
    this.currentMockUsers$.subscribe(
      (x) => (updatedUsers = x.filter((u) => u.id !== user.id))
    );
    this.mockUsersSubject.next(updatedUsers);
  }
}
