import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        if (!this.userService.user) return this.userService.doMe();
    }
}
