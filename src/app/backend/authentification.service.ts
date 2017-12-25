import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CanActivate } from '@angular/router/src/interfaces';
import { User } from './user';

@Injectable()
export class AuthentificationService implements CanActivate {

  url = 'http://192.168.99.100:2403/users';

  constructor(private http: Http) { }

  login(username: string, password: string) {
    this.url += '?userName=' + username + '&password=' + password;
    return this.http.get(this.url).map((response) => {
      let user: {};
      if (response.json().length > 0) {
        user = response.json()[0];
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        throw new Error('Auth error');
      }
      return user;
    });
  }
  canActivate() {
    let user: User = JSON.parse(localStorage.getItem('currentUser')) as User;
    let res = false;
    if (user.userName === 'admin') {
      res = true;
    }

    return res;
  }
}
