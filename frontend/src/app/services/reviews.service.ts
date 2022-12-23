import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../components/modal/modal.component";
import { ErrorInterceptor } from "../interceptors/error.interceptor";
import { ReviewDto } from "../models/dto/review.dto";
import { Order } from "../models/order";
import { ReviewsComponent } from "../views/customer/reviews/reviews.component";
import { CoreRequestService } from "./core-request.service";
@Injectable({
    providedIn: 'root'
  })
export class ReviewsService{
constructor(private modal:NgbModal, private requestService:CoreRequestService){
}

openModal(){
    const ModalRef = this.modal.open(ReviewsComponent);
}

RateOrder(review:ReviewDto){
  this.requestService.post('/Reviews', review ).catch(x=>{
    console.log(x);
  })
}
}