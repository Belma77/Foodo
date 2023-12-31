import { RouterModule } from '@angular/router';
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
import { LoginComponentRestaurant } from './views/login-restaurant/login-restaurant.component';
import { ModalComponent } from './components/modal/modal.component';
import { CourierDashboardComponent } from './views/courier/dashboard/courier-dashboard.component';
import { StartPageComponent } from './views/courier/dashboard/start-page/start-page.component';
import { OrderOfferComponent } from './views/courier/dashboard/order-offer/order-offer.component';
import { CourierRegisterComponent } from './views/courier/courier-register/courier-register.component';
import { CourierLoginComponent } from './views/courier/courier-login/courier-login.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {ToastrModule} from "ngx-toastr";
import { OrderTrackingComponent } from './views/courier/dashboard/order-tracking/order-tracking.component';
import { NewProductComponent } from './views/restaurant/new-product/new-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProfileComponent } from './views/restaurant/dashboard/profile/profile.component';
import {CheckoutComponent} from "./views/customer/checkout/checkout.component";
import { StripeModule } from "stripe-angular";
import {CancelComponent} from "./views/customer/checkout/cancel.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PopUpComponent} from "./views/courier/dashboard/start-page/pop-up/pop-up.component";
import {MatDialogModule} from "@angular/material/dialog";
import { PendingOrdersComponent } from './views/courier/dashboard/pending-orders/pending-orders.component';
import { IncomingOrderComponent } from './views/restaurant/dashboard/incoming-order/incoming-order.component';
import { ActivitiesComponent } from './views/courier/dashboard/activities/activities.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReviewsComponent } from './views/customer/reviews/reviews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PickLocationComponent } from './views/customer/pick-location/pick-location.component';
import { LocationService } from './services/location.service';
import { UsedAdressesComponent } from './views/customer/used-adresses/used-adresses.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MenuComponent,
    OrdersComponent,
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
    HomePageComponent,
    CourierRegisterComponent,
    CourierLoginComponent,
    OrderTrackingComponent,
    NewProductComponent,
    ProfileComponent,
    CheckoutComponent,
    CancelComponent,
PopUpComponent,
PendingOrdersComponent,
IncomingOrderComponent,
ActivitiesComponent,
HeaderComponent,
FooterComponent,
LocationWrapperComponent,
ReviewsComponent,
LocationPickerComponent,
PickLocationComponent,
ReviewsComponent,
PickLocationComponent,
UsedAdressesComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBegM_iSWWCdKWbNY2SFp8SMUlWcRGRlYk',
      libraries: ['places']
    }),
    AgmDirectionModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),

    StripeModule.forRoot("pk_test_51Kw0aQKRuZYR6PFuWr7T06KwduEmYLRK07ovV0aGsKLAe41y8Tq8FfVTCxyULkyn2p2SSWNkv5qWBMqM04D6DoKf005ruX3VcY"),
      BrowserAnimationsModule,
    MatDialogModule,
    NgbModule
    
  ],
  providers: [
       AuthService,
       UserService,
       RestaurantService,
       CoreRequestService,
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
