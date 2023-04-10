import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreRequestService } from 'src/app/services/core-request.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-used-adresses',
  templateUrl: './used-adresses.component.html',
  styleUrls: ['./used-adresses.component.scss']
})

export class UsedAdressesComponent implements OnInit {
adresses!:any;


  constructor(private locationService:LocationService, public modal:NgbActiveModal, private router:Router) { }

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
      this.router.navigate(['/pick-location']);
      this.modal.close();
   }

   ChooseAdress(adress:any)
   {   
       console.log(adress);  
       this.locationService.UpdateLocation(adress);
       this.modal.close();
   }
}
