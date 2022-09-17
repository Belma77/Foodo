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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  restaurants!:Restaurant[]


  constructor(
private authService:AuthService, private userService:UserService, private restaurantService:RestaurantService, private router:Router) {

   }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().then(data => {
      console.log(data);
      this.restaurants = data
    });
  }


  odjaviSe(){
    this.userService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
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

  prijaviSe() {
    this.router.navigateByUrl('login');
  }
}
