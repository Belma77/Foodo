import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-dashboard',
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.scss']
})
export class CourierDashboardComponent implements OnInit {
  opened: boolean = false;
  profil:boolean=false;
  constructor(
     private router: Router, 
     private userService:UserService,
     private courierService:CourierService
    ) { }

  get user() {
    return this.userService.user;
  }

  ngOnInit(): void {
  }

  onMenuClick() {
    
    this.opened = !this.opened;
  }

  klikni() {
    this.profil=!this.profil;
  }

  Odjava() {
    this.courierService.setStatusInactive().then(()=>{
      console.log("neaktivan");
    })
    this.userService.logout();
    this.router.navigateByUrl('login/courier');
   
  }
}
