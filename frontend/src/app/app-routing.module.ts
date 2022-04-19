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
import {WalletComponent} from './views/restaurant/dashboard/wallet/wallet.component';
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

const routes: Routes = [
  {path:'',
   component: HomePageComponent,
  },
  {path:'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},

  { path:'customer/home-page',
    component:HomePageComponent,
    canActivate:[AuthGuard, RoleGuard], data: { roles: [UserRole.CUSTOMER.valueOf(), UserRole.COURIER.valueOf()]}
  },
  {path:'courier-register', component:CourierRegisterComponent},
  {path:'courier-login', component:CourierLoginComponent},
  {path:'login-restaurant', component:LoginComponentRestaurant},
  {path:'register-business', component:RestaurantRegisterComponent},

  {path:'restaurant/:slug', component:RestaurantComponent},
  {
    path:'restaurant/dashboard',
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
        path:"wallet",
        component:WalletComponent
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
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
