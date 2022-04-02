import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}
  userRoles: string[] = [];
    get isLoggedIn() {
        return localStorage.getItem('token') != null ? true : false;
    }

    logout() {
        localStorage.removeItem('token');
    }
  setRoles(Roles: string[]){
    this.userRoles = Roles.slice(0);
  }

  getRoles(){
    return this.userRoles;
  }
}
