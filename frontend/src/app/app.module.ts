import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
// import { ServicesComponent } from './services/services.component';
import { ModelsComponent } from './models/models.component';
// import { EnumsComponent } from './enums/enums.component';
import { DtoComponent } from './models/dto/dto.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // ServicesComponent,
    ModelsComponent,
    // EnumsComponent,
    DtoComponent,
    DashboardComponent,
    MenuComponent,
    OrdersComponent,
    StatisticsComponent,
    WalletComponent,
    ProductComponent,
    NewProductComponent,
    RestaurantCardComponent,
    HomePageComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
