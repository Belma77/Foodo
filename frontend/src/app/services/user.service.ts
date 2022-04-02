import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Notification } from '../models/notification.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { CoreRequestService } from './core-request.service';
import {Customer} from "../models/customer";
import {UserRole} from "../models/enums/user-role";
// import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    user! : User;
    notifications: Notification[] = [];


    constructor(
        private requestService: CoreRequestService,
        private authService: AuthService,
        private router: Router,
        // private notifcationService: NotificationService,
        // private socialAuthService:SocialAuthService
     ) {
        // this.getNotifications();
        // setInterval(() => {
        //     this.getNotifications();
        // }, 5000);
    }

    async register(user: User): Promise<any> {
        await this.requestService.post('/customer/register', user).then((data: any) => {
            this.router.navigate(['/login']);
        }).catch(err => console.log(err));
     }

    async login(user: User): Promise<any> {
        await this.requestService.post('/customer/login', user).then(async (data: { token: string; role:UserRole }) => {
            console.log(data)
            localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
             await this.doMe().then(() => {
                this.router.navigate(['/customer/home-page']);
             }).catch((err: any) => {
               console.log(err);

        }).catch((err: any) => {
               console.log(err);
    });
        });
    }

    // async googlePopupLogin(){
    //     return await this.socialAuthService
    //     .signIn(GoogleLoginProvider.PROVIDER_ID)
    //     .then((res: SocialUser) => {
    //         return this.googleLogin(res);
    //     });
    // }

    // async googleLogin(user:SocialUser){
    //     await this.requestService.post('/login/social/google', {"idTokenString":user.idToken}).then(async (data: { token: string; }) => {
    //         localStorage.setItem('token', data.token);
    //         await this.doMe().then(() => {
    //             this.router.navigate(['']);
    //         });
    //     });
    // }

    async doMe() {
        await this.requestService
            .get('/user/doMe')
            .then((res: User) => {
                this.user = res;
            })
            .catch((err: any) => {
              this.logout();
              console.log(err);
            });
    }

    // async updateUser(value: FormData) {
    //     await this.requestService
    //         .put(`/user/${this.user.id}`, value)
    //         .then((res: User) => {
    //             this.user = res;
    //         })
    //         .catch((err) => {
    //         });
    // }

    logout() {
        location.reload();
        this.authService.logout();
        // this.socialAuthService.signOut();
    }

    // async resetPassword(token: String, id: number, password: String) {
    //     await this.requestService
    //         .put(`/password/reset?id=${id}&token=${token}`, password)
    //         .then(() => {
    //             this.router.navigateByUrl('/login');
    //         })
    //         .catch((err) => {
    //             throw new Error(err);
    //         });
    // }

    async forgotPassword(email: String) {
        await this.requestService.post(`/password/forgot`, email);
    }

    // async getUserBids() {
    //     return await this.requestService.get('/user/bids');
    // }

    // async deactivateAccount() {
    //     await this.requestService
    //         .put(`/user/${this.user.id}/deactivate`, null)
    //         .then(() => {
    //             this.logout();
    //         })
    //         .catch((err) => {
    //         });
    // }

    // getNotifications() {
    //     if (this.authService.isLoggedIn) {
    //         this.requestService
    //             .getNotifications()
    //             .then((res: Notification[]) => {
    //                 if (this.notifications.length)
    //                     this.notifications = res.filter((n1) =>
    //                         this.notifications.some(
    //                             (n2) =>
    //                                 n2 &&
    //                                 n1.id === n2.id &&
    //                                 n1.status ===
    //                                     n2.status
    //                         )
    //                     );
    //                 else this.notifications = res;
    //             });
    //     }
    // }

    // markNotificationAsRead(id: number) {
    //     this.notifications = this.notifications.filter((not) => not.id != id);
    //     this.requestService.updateNotificationStatus(id);
    // }
}
