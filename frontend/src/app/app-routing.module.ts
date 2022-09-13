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

const routes: Routes = [
  {path:'',
   component: HomePageComponent,
  },
  {path:'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},

  { path:'customer/home-page',
    component:HomePageComponent,
   // canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole.CUSTOMER.valueOf(), UserRole.COURIER.valueOf()]}
  },
  {path:'courier-register', component:CourierRegisterComponent},
  {path:'courier-login', component:CourierLoginComponent},
  {path:'login-restaurant', component:LoginComponentRestaurant},
  {path:'register-business', component:RestaurantRegisterComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'restaurant/:slug', component:RestaurantComponent},
  {path:'restaurantOrders', component:OrdersComponent},

  // Restaurant dashboard links
  {path:'customer-order-tracking', component:CustomerOderTrackerComponent},
  {
    path:'restaurant/admin/dashboard',
    component:DashboardComponent,
    children:[
      {
        path:"",
        component:OrdersComponent
      },
      {
        path:"orders",
        component:OrdersComponent
      },
      {
        path:"menu",
        component:MenuComponent
      },
      {
        path:"statistics",
        component:StatisticsComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:'new-product',
        component:NewProductComponent,
      },
      {
        path:'edit-product/:id',
        component:NewProductComponent,
      }
    ]
  },


  //Courier dashboard routes
  {
    path:'courier/dashboard',
    component:CourierDashboardComponent,
    children:[
      {
        path:"",
        component:StartPageComponent
      },
      {
        path:"order/offer",
        component:OrderOfferComponent
      },
      {
        path:"pending/orders",
        component:PendingOrdersComponent
      },
      {
        path:"order/tracking",
        component:OrderTrackingComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
