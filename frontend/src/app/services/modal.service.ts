import { Injectable, Type } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal!: ModalComponent; 

  constructor() { }

  initializeModel(model: ModalComponent) {
    this.modal = model;
  }

  insertComponentToModal(component: Type<any>) {
    this.modal!.addComponent(component);
  }
}
