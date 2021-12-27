import { Component, OnInit } from '@angular/core';
import { LocationPickerComponent } from 'src/app/components/location-picker/location-picker.component';
import { MapDragablePickerComponent } from 'src/app/components/map-dragable-picker/map-dragable-picker.component';
import { Restaurant } from 'src/app/models/restaurant';
import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/models/user.model';
import data from '../../../mock/restaurant.json'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  restaurants:Restaurant[]
  //Todo get this from auth service
  isLoggedIn = true;
  currentUser!: User;
  constructor(

  ) {
      this.restaurants = data;

   }

  ngOnInit(): void {
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

}
