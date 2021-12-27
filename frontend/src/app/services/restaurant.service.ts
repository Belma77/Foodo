import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Restaurant } from '../models/restaurant';
import { AuthService } from './auth.service';
import { CoreRequestService } from './core-request.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  restaurant!: Restaurant;
  categories:Category[] = [];

  constructor(private requestService:CoreRequestService, private router:Router, private authService: AuthService) {
      this.getCategories();
   }

  async getCategories() {
    this.requestService.get('/product/categories')
    .then((data:Category[]) => this.categories = data)
  }

  //change this to slug maybe
  async getProducts(restaurantId:number) {
   return await this.requestService.get('/product')
  }

  async getProductById(id:number) {
    return await this.requestService.get('/product/' + id)
   }

  async updateProduct(product:Product, id:number) {
    await this.requestService.put("/product/" + id, product)
      .then(() => {
        this.router.navigateByUrl('/restaurant/dashboard/menu')
      })
      .catch(e => {
        console.log(e)
      })
  }

  async addProduct(product:Product) {
    await this.requestService.post("/product", product)
      .then(() => {
        this.router.navigateByUrl('/restaurant/dashboard/menu')
      })
  }

  async deleteProduct(id:number) {
    await this.requestService.delete("/product/"+id)
    .then(() => window.location.reload());
  }  

  async register(restaurant: Restaurant): Promise<any> {
    await this.requestService.post('/restaurant/register', restaurant).then((data: any) => {
        this.router.navigate(['/login-restaurant']);
    });
 }

}
