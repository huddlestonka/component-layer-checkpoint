import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@bba/api-interfaces';
import { UsersFacade } from '@bba/core-state';

@Component({
  selector: 'bba-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersFacade],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.usersFacade.currentUsers$;
  selectedUser$: Observable<string> = this.usersFacade.selectedUser$;

  constructor(private usersFacade: UsersFacade) {}

  ngOnInit(): void {}

  resetForm() {
    this.usersFacade.selectUser(null);
  }

  selectUser(user: User) {
    this.usersFacade.selectUser(user.id);
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
}
