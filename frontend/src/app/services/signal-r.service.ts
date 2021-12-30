import { Injectable } from '@angular/core';
import { LogLevel, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!:HubConnection;

  constructor() {

  }

  public startConnection = () => {
  this.hubConnection = new HubConnectionBuilder()
  .withUrl('https://localhost:5001/hub', {
    accessTokenFactory: () => 'Acces token'
  })
  .configureLogging(LogLevel.Debug)
  .build();
  
  this.hubConnection
  .start()
  .then(() => console.log('Connection started'))
  .catch(err => console.log('Error while starting connection: ' + err))
  }

  public orderOfferListener = () => {
    this.hubConnection.on('orderOffer', (data) => {
      console.log(data)
      console.log("order offer");
  })

}
}