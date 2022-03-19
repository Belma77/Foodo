import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DtoComponent } from './models/dto/dto.component';
import { DashboardComponent } from './views/restaurant/dashboard/dashboard.component';
import { MenuComponent } from './views/restaurant/dashboard/menu/menu.component';
import { OrdersComponent } from './views/restaurant/dashboard/orders/orders.component';
import { StatisticsComponent } from './views/restaurant/dashboard/statistics/statistics.component';
import { WalletComponent } from './views/restaurant/dashboard/wallet/wallet.component';
import { ProductComponent } from './components/product/product.component';
import { RestaurantComponent } from './views/customer/restaurant/restaurant.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationWrapperComponent } from './components/location-wrapper/location-wrapper.component';
import { OrderLineComponent } from './components/order-line/order-line.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MapDragablePickerComponent } from './components/map-dragable-picker/map-dragable-picker.component';   // agm-direction
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RestaurantRegisterComponent } from './views/restaurant/register-business/register.component';
import { HomePageComponent } from './views/customer/home-page/home-page.component';
import { RestaurantCardComponent } from './views/customer/restaurant-card/restaurant-card.component';
import { CoreRequestService } from './services/core-request.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RestaurantService } from './services/restaurant.service';
import { AlertComponent } from './alert/alert.component';
import { LoginComponentRestaurant } from './views/login-restaurant/login-restaurant.component';
import { ModalComponent } from './components/modal/modal.component';
import { CourierDashboardComponent } from './views/courier/dashboard/courier-dashboard.component';
import { StartPageComponent } from './views/courier/dashboard/start-page/start-page.component';
import { OrderOfferComponent } from './views/courier/dashboard/order-offer/order-offer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DtoComponent,
    DashboardComponent,
    MenuComponent,
    OrdersComponent,
    StatisticsComponent,
    WalletComponent,
    ProductComponent,
    RestaurantCardComponent,
    RestaurantRegisterComponent,
    RestaurantComponent,
    CourierDashboardComponent,
    StartPageComponent,
    OrderOfferComponent,
    LocationPickerComponent,
    MapDragablePickerComponent,
    ModalComponent,
    LocationWrapperComponent,
    OrderLineComponent,
    LoginComponentRestaurant,
    AlertComponent,    
    HomePageComponent,
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
    AgmDirectionModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    
  ],
  providers: [
       AuthService,
       UserService,
       CoreRequestService,
    //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
