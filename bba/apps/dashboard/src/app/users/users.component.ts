import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '@bba/api-interfaces';
import { UsersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersFacade],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  sub: Subscription;

  constructor(private usersFacade: UsersFacade) {}

  ngOnInit(): void {
    this.sub = this.usersFacade.currentUsers$.subscribe(
      (x) => (this.users = x)
    );
  }

  saveUser(user: User) {
    if (user.id) {
      this.usersFacade.updateUser(user);
    } else {
      this.usersFacade.createUser(user);
    }
  }

  deleteUser(user: User) {
    this.usersFacade.deleteUser(user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
