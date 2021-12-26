import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Restaurant } from './models/restaurant';
import { HomePageComponent } from './views/customer/home-page/home-page.component';
import { RestaurantComponent } from './views/customer/restaurant/restaurant.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/restaurant/dashboard/dashboard.component';
import { MenuComponent } from './views/restaurant/dashboard/menu/menu.component';
import { OrdersComponent } from './views/restaurant/dashboard/orders/orders.component';
import { StatisticsComponent } from './views/restaurant/dashboard/statistics/statistics.component';
import { WalletComponent } from './views/restaurant/dashboard/wallet/wallet.component';
import { NewProductComponent } from './views/restaurant/new-product/new-product.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'login', component:LoginComponent},
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
