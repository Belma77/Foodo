import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {AuthService} from './auth.service';
import {CoreRequestService} from './core-request.service';
import {UserRole} from "../models/enums/user-role";
import {Courier} from "../models/courier.model";
import {AlertService} from "./alert.service";
import {SignalRService} from "./signal-r.service";
import { OrderService } from './order.service';
import { CourierService } from './courier.service';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    user! : User;
    error: string | undefined;

    constructor(
        private requestService: CoreRequestService,
        private authService: AuthService,
        private router: Router,
        private alert:AlertService,
        private signalR: SignalRService,
        private courierService:CourierService
     ) 
     { }

    async register(user: User): Promise<any> {
        await this.requestService.post('/customer/register', user).then( (data: any) => {
             this.router.navigate(['/login']);
        }).catch((err:any)=>{
          throw err;
        })
     }


  async courierRegister(user: Courier): Promise<any> {
    await this.requestService.post('/courier/register', user).then((data: any) => {
      this.router.navigate(['/login/courier']);
    }).catch(err => {
      throw err
    });
  }


    async login(user: User): Promise<any> {
        await this.requestService.post('/customer/login', user).then(async (data: { token: string; }) => {
            localStorage.setItem('token', data.token);
          this.signalR.startConnection();
             await this.doMe().then(() => {
                this.router.navigate(['/customer/home-page']);
             }).catch((err: any) => {
               console.log(err);
        }).catch((err: any) => {
               console.log(err);
    });
        });
    }


  async courierLogin(user: Courier): Promise<any> {
    await this.requestService.post('/courier/login', user).then(async (data: { token: string; }) => {
      localStorage.setItem('token', data.token);
      await this.courierService.setStatusActive();
      this.signalR.startConnection();
      await this.doMe().then((response:any) => {
        this.router.navigate(['/courier/dashboard']);
      }).catch((err: any) => {
        console.log(err);
      }).catch((err: any) => {
        console.log(err);
      });
    });
  }

getRole()
{
  // var role=this.user.role;
   var role=localStorage.getItem('role');
   console.log(role);
   return role!=null?role:null;
}


    async doMe() {
        await this.requestService
            .get('/user/doMe')
            .then((res: User) => {
              console.log(res);
              var role=localStorage.setItem('role', res.role);
              console.log(res.role);
              this.user = res;
            })
            .catch((err: any) => {
              console.log(err);
              //this.logout();
            });
    }

    logout() {
        location.reload();
        this.authService.logout();

    }
}
