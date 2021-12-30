import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CoreRequestService } from './services/core-request.service';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(public signalRService: SignalRService, public requestService: CoreRequestService) { }
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.orderOfferListener();
    // this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.requestService.get('/hub')
      .then(res => {
        console.log(res);
      })
  }
}
