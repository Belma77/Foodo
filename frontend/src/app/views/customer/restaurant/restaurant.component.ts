import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Restaurant } from 'src/app/models/restaurant';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { environment } from 'src/environments/environment';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopUpComponent} from "../../courier/dashboard/start-page/pop-up/pop-up.component";
import { ReviewsComponent } from '../reviews/reviews.component';
import { UsedAdressesComponent } from '../used-adresses/used-adresses.component';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input() adress!:boolean;
  restaurant!:Restaurant;
  groupedProducts!:Map<string,Product[]>;
  currentAdress:any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService:OrderService,
              private restaurantService:RestaurantService,
              private viewportScroller: ViewportScroller,
              private modal: NgbModal,
              private locationService:LocationService,
              ) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // TODO change later to slug
      let slug = params['slug'];
      console.log(slug)
      this.restaurantService.getRestaurant(slug)
      .then((res:Restaurant) => {
        if(!res || res === undefined)
          this.router.navigateByUrl("");
        else {
          this.restaurant = res;
          if(res.products)
            this.transpose()
        }
      })
      .catch((e) => {
        console.log(e)
        this.router.navigateByUrl("")
      })
    });
  }

  transpose() {
    let groupedProducts = new Map<string,Product[]>();
    this.restaurant.products.map(p => {
      if(!groupedProducts.has(p.category.name))
        groupedProducts.set(p.category.name, [p])
      else
        groupedProducts.get(p.category.name)?.push(p)
    })
      this.groupedProducts = groupedProducts;
  }

  public anchorScroll(elementId: string): void {
      this.viewportScroller.scrollToAnchor(elementId);
  }

  addProductToOrder(p:Product) {
    this.orderService.addProductToOrder(p);
  }

  removeProductFromOrder(p:Product) {
    this.orderService.removeProductFromOrder(p);
  }

  get order() {
    return this.orderService.currentOrder;
  }

  makeOrder() { 
     this.orderService.makeOrder(this.restaurant);
  }

  selected(selected:boolean)
  {
    this.adress=selected;
  }

  setLocation()
  {
    this.locationService.GetLocation().then(x=>{
      this.currentAdress=x;

    if(this.currentAdress === null)
    {
      this.router.navigate(['/pick-location']);
    } 

    else
    {
     const ModalRef=this.modal.open(UsedAdressesComponent);
     ModalRef.componentInstance.restaurant=this.restaurant;
    }

    })
  }

  get imageUrl() {
    return environment.api + "/download?fileUrl=" + this.restaurant.headerImage;
  }
}


