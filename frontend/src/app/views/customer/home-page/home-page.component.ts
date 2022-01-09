import { Component, OnInit } from '@angular/core';
import { LocationPickerComponent } from 'src/app/components/location-picker/location-picker.component';
import { MapDragablePickerComponent } from 'src/app/components/map-dragable-picker/map-dragable-picker.component';
import { Restaurant } from 'src/app/models/restaurant';
import { ModalService } from 'src/app/services/modal.service';
import data from '../../../mock/restaurant.json'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  restaurants:Restaurant[]

  constructor(private modalService:ModalService) {
      this.restaurants = data;
   }

  ngOnInit(): void {
  }

  injectLocationPicker() {
    this.modalService.insertComponentToModal(LocationPickerComponent)
  }

  injectLocationDragablePicker() {
    this.modalService.insertComponentToModal(MapDragablePickerComponent)
  }

}
