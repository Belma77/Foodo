import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CoreRequestService } from './services/core-request.service';
import { SignalRService } from './services/signal-r.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RestaurantService } from './services/restaurant.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  currentUser!: User;
  constructor(public signalRService: SignalRService, public requestService: CoreRequestService, private userService: UserService,
    private authService: AuthService, private resService: RestaurantService,         private router: Router,
    ) {
        if (authService.isLoggedIn) 
        this.userService.doMe();
       
     }
     
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.orderOfferListener();
    this.startHttpRequest();
  }
  

  private startHttpRequest = () => {
    this.requestService.get('/hub')
      .then(res => {
        console.log(res);
      })
    }}
