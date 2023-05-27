import {RouterModule, Routes} from '@angular/router';
import {CourierDashboardComponent} from './views/courier/dashboard/courier-dashboard.component';
import {OrderOfferComponent} from './views/courier/dashboard/order-offer/order-offer.component';
import {StartPageComponent} from './views/courier/dashboard/start-page/start-page.component';
import {HomePageComponent} from './views/customer/home-page/home-page.component';
import {RestaurantComponent} from './views/customer/restaurant/restaurant.component';
import {LoginComponent} from './views/login/login.component';
import {DashboardComponent} from './views/restaurant/dashboard/dashboard.component';
import {MenuComponent} from './views/restaurant/dashboard/menu/menu.component';
import {OrdersComponent} from './views/restaurant/dashboard/orders/orders.component';
import {StatisticsComponent} from './views/restaurant/dashboard/statistics/statistics.component';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './views/register/register.component';
import {LoginComponentRestaurant} from './views/login-restaurant/login-restaurant.component';
import {NewProductComponent} from './views/restaurant/new-product/new-product.component';
import {AuthGuard} from "./guards/auth.guard";
import {RestaurantRegisterComponent} from "./views/restaurant/register-business/register.component";
import {CourierRegisterComponent} from "./views/courier/courier-register/courier-register.component";
import {CourierLoginComponent} from "./views/courier/courier-login/courier-login.component";
import {RoleGuard} from "./guards/role.guard";
import {UserRole} from "./models/enums/user-role";
import { ProfileComponent } from './views/restaurant/dashboard/profile/profile.component';
import { CheckoutComponent } from './views/customer/checkout/checkout.component';
import {CancelComponent} from "./views/customer/checkout/cancel.component";
import {CustomerOderTrackerComponent} from "./views/customer/customer-oder-tracker/customer-oder-tracker.component";
import {PendingOrdersComponent} from "./views/courier/dashboard/pending-orders/pending-orders.component";
import {OrderTrackingComponent} from "./views/courier/dashboard/order-tracking/order-tracking.component";

import {ActivitiesComponent} from "./views/courier/dashboard/activities/activities.component";
import { ReviewsComponent } from './views/customer/reviews/reviews.component';
import { PickLocationComponent } from './views/customer/pick-location/pick-location.component';
import { MapDragablePickerComponent } from './components/map-dragable-picker/map-dragable-picker.component';
import { UsedAdressesComponent } from './views/customer/used-adresses/used-adresses.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { LocationWrapperComponent } from './components/location-wrapper/location-wrapper.component';


const routes: Routes = [
  {path:'',
   component: LoginComponent,
   // canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole.CUSTOMER.valueOf(), UserRole.COURIER.valueOf(), UserRole.RESTAURANT.valueOf() ]}
  },
  {path:'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},

  { path:'customer/home-page',
    component:HomePageComponent,
    canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole[UserRole.Customer], UserRole[UserRole.Courier], UserRole[UserRole.Restaurant] ]}
  },
  {path:'pick-location', component:PickLocationComponent},
  {path:'location-picker', component:LocationPickerComponent,
  children:[
  ]
},
{path:'marker-picker', component:MapDragablePickerComponent},
{path:'location-wrapper', component:LocationWrapperComponent},
{path:'used-adresses', component:UsedAdressesComponent},
{path:'checkout', component:CheckoutComponent},
{path:'cancel', component:CancelComponent},

  {path:'register/courier', component:CourierRegisterComponent},
  {path:'login/courier', component:CourierLoginComponent},
  {path:'login/business', component:LoginComponentRestaurant},
  {path:'register/business', component:RestaurantRegisterComponent},
  {path:'checkout', component:CheckoutComponent,
    canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole[UserRole.Customer]]}
  },
  {path:'rateOrders', component:ReviewsComponent},
  {path:'restaurant/:slug', component:RestaurantComponent,
    canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole[UserRole.Customer]]}
  },

  // Restaurant dashboard links
  {path:'customer-order-tracking', component:CustomerOderTrackerComponent,
    canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole[UserRole.Customer]]}

  },
  {
    path:'restaurant/admin/dashboard',
    component:DashboardComponent,

      children: [
        {
          path: "",
          component: OrdersComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Restaurant]]}
        },
        {
          path: "orders",
          component: OrdersComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles:[UserRole[UserRole.Restaurant]]},
        },
        {
          path: "menu",
          component: MenuComponent
        },
        {
          path: "statistics",
          component: StatisticsComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Restaurant]]},
        },
        {
          path: "profile",
          component: ProfileComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Restaurant]]},
        },
        {
          path: 'new-product',
          component: NewProductComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Restaurant]]},
        },
        {
          path: 'edit-product/:id',
          component: NewProductComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Restaurant]]},
        },

      ]

  },

  //Courier dashboard routes
  {
    path:'courier/dashboard',
    component:CourierDashboardComponent,

      children: [
        {
          path: "",
          component: StartPageComponent,
          canActivate:[AuthGuard, RoleGuard], 
          data: {
            roles: [UserRole[UserRole.Courier]]}  
        },
        {
          path: "home",
          component: StartPageComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Courier]]},
        },
        {
          path: "order/offer",
          component: OrderOfferComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Courier]]},
        },
        {
          path: "pending/orders",
          component: PendingOrdersComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Courier]]},
        },
        {
          path: "order/tracking",
          component: OrderTrackingComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Courier]]},
        },

        {
          path: "activities",
          component: ActivitiesComponent,
          canActivate:[AuthGuard, RoleGuard], data: {
            roles: [UserRole[UserRole.Courier]]},
        },
      ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
