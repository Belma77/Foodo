import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// import { Notification } from '../models/notification.model';
import {User} from '../models/user.model';
import {AuthService} from './auth.service';
import {CoreRequestService} from './core-request.service';
import {UserRole} from "../models/enums/user-role";
import {Courier} from "../models/courier";
import {AlertService} from "./alert.service";

// import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    user! : User;
    notifications: Notification[] = [];
    error: string | undefined;

    constructor(
        private requestService: CoreRequestService,
        private authService: AuthService,
        private router: Router,
        private alert:AlertService
        // private notifcationService: NotificationService,
        // private socialAuthService:SocialAuthService
     ) {
        // this.getNotifications();
        // setInterval(() => {
        //     this.getNotifications();
        // }, 5000);
    }

    async register(user: User): Promise<any> {
        await this.requestService.post('/customer/register', user).then( (data: any) => {
             this.router.navigate(['/login']);
        }).catch((err:any)=>{
          throw err;
        })
     }


  async courierRegister(user: Courier): Promise<any> {
    await this.requestService.post('/courier/register', user).then((data: any) => {
      this.router.navigate(['/courier-login']);
    }).catch(err => {
      throw err
    });
  }


    async login(user: User): Promise<any> {
        await this.requestService.post('/customer/login', user).then(async (data: { token: string; }) => {
            localStorage.setItem('token', data.token);
             await this.doMe().then(() => {
                this.router.navigate(['/customer/home-page']);
             }).catch((err: any) => {
               console.log(err);
        }).catch((err: any) => {
    });
        });
    }


  async courierLogin(user: Courier): Promise<any> {
    await this.requestService.post('/courier/login', user).then(async (data: { token: string; }) => {
      localStorage.setItem('token', data.token);
      await this.doMe().then((response:any) => {
        this.router.navigate(['/customer/home-page']);
      }).catch((err: any) => {
        console.log(err);
      }).catch((err: any) => {
        console.log(err);
      });
    });
  }

getRole()
{
   var role=this.user.role;
   return role!=null?role:null;
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
                console.log(res)           
                this.user = res;
            })
            .catch((err: any) => {
              this.logout();
            });
    }

    logout() {
        location.reload();
        this.authService.logout();
        // this.socialAuthService.signOut();
    }

    async forgotPassword(email: String) {
        await this.requestService.post(`/password/forgot`, email);
    }

}
