import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DashboardComponent } from './views/restaurant/dashboard/dashboard.component';
import { MenuComponent } from './views/restaurant/dashboard/menu/menu.component';
import { OrdersComponent } from './views/restaurant/dashboard/orders/orders.component';
import { StatisticsComponent } from './views/restaurant/dashboard/statistics/statistics.component';
import { WalletComponent } from './views/restaurant/dashboard/wallet/wallet.component';
import { ProductComponent } from './components/product/product.component';
import { NewProductComponent } from './views/restaurant/new-product/new-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RestaurantCardComponent } from './views/customer/restaurant-card/restaurant-card.component';
import { HomePageComponent } from './views/customer/home-page/home-page.component';
import { RestaurantComponent } from './views/customer/restaurant/restaurant.component';
import { HttpClientModule } from '@angular/common/http';
import { CourierDashboardComponent } from './views/courier/courier-dashboard/courier-dashboard.component';
import { StartPageComponent } from './views/courier/courier-dashboard/start-page/start-page.component';
import { OrderOfferComponent } from './views/courier/courier-dashboard/order-offer/order-offer.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MapDragablePickerComponent } from './components/map-dragable-picker/map-dragable-picker.component';   // agm-direction


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MenuComponent,
    OrdersComponent,
    StatisticsComponent,
    WalletComponent,
    ProductComponent,
    NewProductComponent,
    RestaurantCardComponent,
    HomePageComponent,
    RestaurantComponent,
    CourierDashboardComponent,
    StartPageComponent,
    OrderOfferComponent,
    LocationPickerComponent,
    MapDragablePickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDkdwLMph3UdzriJtg7LjFQMurftgR4Fk',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
