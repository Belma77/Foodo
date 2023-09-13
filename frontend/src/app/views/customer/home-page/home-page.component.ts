import { Component, OnInit } from '@angular/core';
import { LocationPickerComponent } from 'src/app/components/location-picker/location-picker.component';
import { MapDragablePickerComponent } from 'src/app/components/map-dragable-picker/map-dragable-picker.component';
import { Restaurant } from 'src/app/models/restaurant';
import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/models/user.model';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import { RestaurantService } from 'src/app/services/restaurant.service';
import {Router} from "@angular/router";
import { ReviewsService } from 'src/app/services/reviews.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { X } from '@angular/cdk/keycodes';
import { OrderStatus } from 'src/app/models/enums/order-status';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  restaurants:Restaurant[]=[]
  naziv:string="";
  order!: Order;
  constructor(
private authService:AuthService, private userService:UserService, private restaurantService:RestaurantService, private router:Router, 
private reviewService:ReviewsService,
private orderService:OrderService){
  
   }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().then(data => {
      this.restaurants = data;
      console.log(data);
    });
    this.orderService.getLatestOrder();
    this.ShowModal();
  }

  ShowModal(){

    var order = localStorage.getItem('order');
    this.orderService.getLatestOrder().then((x:Order)=>{
      this.order=x;    
      
      if(this.order.rated==false&&this.order.orderStatus==OrderStatus.COMPLETED.valueOf()&&(order!=JSON.stringify(this.order.id))){
        this.reviewService.openModal();
      }  
    })
      
       

    
  }

  odjaviSe(){
    this.userService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  prijaviSe() {
    this.router.navigateByUrl('login');
  }

  getRestaurants() {
    
   return this.restaurants.filter((x:any)=>x.name.toLowerCase().startsWith(this.naziv.toLowerCase()) || x.name.length==0);
  }
}

  // injectLocationPicker() {
  //   this.modalService.insertComponentToModal(LocationPickerComponent)
  // }

//   injectLocationDragablePicker() {
//     this.modalService.insertComponentToModal(MapDragablePickerComponent)
//   }
//   @HostListener('window:scroll', ['$event'])

//   onWindowScroll() {
//       let element = document.querySelector('header') as HTMLElement;
//       if (window.pageYOffset > element.clientHeight / 3) {
//         element.classList.add('header-inverse');
//       } else {
//         element.classList.remove('header-inverse');
//       }
//     }


