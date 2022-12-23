import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewDto } from 'src/app/models/dto/review.dto';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  order!: Order;
  constructor(public modal:NgbActiveModal, private orderService:OrderService, private reviewService:ReviewsService) { }
  starRating = 0; 

  ngOnInit(): void {
    this.orderService.getLatestOrder().then((x:Order)=>{
      this.order=x;   
    })
  }

RateOrder(){

  var review=new ReviewDto();
  review.OrderId=this.order.id;
  review.Review=this.starRating;
  this.reviewService.RateOrder(review);
  this.modal.close(ReviewsComponent);

}

Close(){
  
  localStorage.setItem('order',JSON.stringify(this.order.id));
  this.modal.close(ReviewsComponent);

}

}
