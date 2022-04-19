import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {UserService} from "../services/user.service";


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private  userService:UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
return this.isAuthorized(route);

  }
  private isAuthorized(route:ActivatedRouteSnapshot):boolean
  {
    const userRole = this.userService.getRole();
    const expectedRoles=route.data.roles;
    return expectedRoles.includes(userRole);
  }
}




