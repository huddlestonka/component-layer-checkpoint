import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@bba/api-interfaces';
import { environment } from '@env/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  model = 'users';

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<User[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<User>(this.getUrlWithId(id));
  }

  create(user: User) {
    return this.http.post(this.getUrl(), user, { headers: headers });
  }

  update(user: User) {
    return this.http.put(this.getUrlWithId(user.id), user, {
      headers: headers,
    });
  }

  delete(user: User) {
    return this.http.delete(this.getUrlWithId(user.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
