import { Component, OnInit } from '@angular/core';
import { CoreRequestService } from './services/core-request.service';
import { SignalRService } from './services/signal-r.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  async = false;

  constructor(
    public signalRService: SignalRService, 
    public requestService: CoreRequestService, 
    private userService: UserService,
    private authService: AuthService
    ) {
      this.async = true;
        if (authService.isLoggedIn) 
          this.userService.doMe().finally(() => this.async = false);
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
