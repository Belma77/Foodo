import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    get isLoggedIn() {
        return localStorage.getItem('token') != null ? true : false;
    }

    logout() {
        localStorage.removeItem('token');
    }
}
