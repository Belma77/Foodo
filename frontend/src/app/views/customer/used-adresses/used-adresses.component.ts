import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/models/restaurant';
import { CoreRequestService } from 'src/app/services/core-request.service';
import { LocationService } from 'src/app/services/location.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-used-adresses',
  templateUrl: './used-adresses.component.html',
  styleUrls: ['./used-adresses.component.scss']
})

@Injectable({
  providedIn: 'root',
})
export class UsedAdressesComponent implements OnInit {
adresses:any;
adress:boolean=false;
@Output() onSelected = new EventEmitter<any>();
@Input() restaurant:any=null;
 res:any=null;

  constructor(private locationService:LocationService,
     public modal:NgbModal, 
     private router:Router,
     private orderService:OrderService
     ) { }

  ngOnInit(): void {
    this.UsedAdresses();
  }


   UsedAdresses()
   {
      this.locationService.GetLocation().then(x=>{
        this.adresses=x;
        console.log(this.adresses);
      })
   }

   AddAdress()
   {
      this.adress=true;
      this.orderService.restaurant=this.restaurant;
      this.router.navigate(['/pick-location']);
      this.modal.dismissAll();
      
   }

   ChooseAdress(adress:any)
   {   
       this.adress=true;
       this.locationService.UpdateLocation(adress);
       this.modal.dismissAll();
       if(this.restaurant!=null)
       {
        this.orderService.makeOrder(this.restaurant);
       }
       
   }

   closeModal()
   {
       this.modal.dismissAll();
   }

}
