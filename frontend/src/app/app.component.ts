import { Component, OnInit } from '@angular/core';
import { CoreRequestService } from './services/core-request.service';
import { SignalRService } from './services/signal-r.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import{MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./views/courier/dashboard/start-page/pop-up/pop-up.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  async = false;

  constructor(
    public signalRService: SignalRService,
    public requestService: CoreRequestService,
    private userService: UserService,
    private authService: AuthService,

  ) {
    if (authService.isLoggedIn) {
      this.async = true;
      this.userService.doMe().finally(() => this.async = false);
      this.signalRService.startConnection();
      this.signalRService.orderOfferListener();
      //this.startHttpRequest();
    }
  }

  ngOnInit() {

  }


  /*private startHttpRequest = () => {
    console.log("http request")
    this.requestService.get('/hub')
      .then(res => {
        console.log(res);
      })
    }}*/
}
