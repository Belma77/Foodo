import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Restaurant } from '../models/restaurant';
import { AuthService } from './auth.service';
import { CoreRequestService } from './core-request.service';
import {User} from "../models/user.model";
import {UserService} from "./user.service";
import { Order } from '../models/order';
import {SignalRService} from "./signal-r.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurant!: Restaurant;
  categories:Category[] = [];

  constructor(private requestService:CoreRequestService, private router:Router, private authService: AuthService, private userService:UserService,
              private signalRservice: SignalRService) {
      this.getCategories();
   }

  async getCategories() {
    this.requestService.get('/product/categories')
    .then((data:Category[]) => this.categories = data)
  }

  async getRestaurants() {
    return await this.requestService.get('/restaurant');
  }

  async getRestaurant(id:number) {
    return await this.requestService.get('/restaurant/' + id)
  }

  async getMenu(restaurantId:number) {
    return await this.requestService.get('/product/menu')
   }

  async getProducts(restaurantId:number) {
   return await this.requestService.get('/product')
  }

  async getProductById(id:number) {
    return await this.requestService.get('/product/' + id)
   }

  async updateProduct(formData:FormData, id:number) {
    await this.requestService.put("/product/" + id, formData)
      .then(() => {
        this.router.navigateByUrl('/restaurant/admin/dashboard/menu')
      })
      .catch(e => {
        console.log(e)
      })
  }

  async addProduct(formData:FormData) {
    await this.requestService.post("/product", formData)
      .then(() => {
        this.router.navigateByUrl('/restaurant/admin/dashboard/menu')
      })
  }

  async deleteProduct(id:number) {
    await this.requestService.delete("/product/"+id)
    .then(() => window.location.reload());
  }

  async register(restaurant: Restaurant): Promise<any> {
    await this.requestService.post('/restaurant/register', restaurant).then((data: any) => {
        this.router.navigate(['/login/business']);
    }).catch((err:any)=>{throw err});
 }

  async login(user: User): Promise<any> {
    await this.requestService.post('/restaurant/Login', user).then(async (data: { token: string; }) => {
      localStorage.setItem('token', data.token);
      console.log(data.token)
      this.signalRservice.startConnection();
      await this.userService.doMe().then((data) => {

        this.router.navigate(['/restaurant/admin/dashboard']);
      });
    });
  }

  async updateProfile(formData:FormData) {
    return await this.requestService.put("/restaurant/profile", formData);
  }



}
