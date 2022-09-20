import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courier-dashboard',
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.scss']
})
export class CourierDashboardComponent implements OnInit {
  opened: boolean = false;
  profil:boolean=false;
  constructor(private authService:AuthService, private router: Router, private userService:UserService) { }

  get user() {
    return this.userService.user;
  }

  ngOnInit(): void {
  }

  onMenuClick() {
    console.log("test")
    this.opened = !this.opened;
  }

  klikni() {
    this.profil=!this.profil;
  }

  Odjava() {
    this.authService.logout();
    this.router.navigateByUrl('login/courier');
  }
}
