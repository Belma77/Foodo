import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewsComponent } from 'src/app/views/customer/reviews/reviews.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollActive = false;


  constructor(private authService:AuthService, private userService:UserService, private service:ReviewsService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get userName() {
    return this.userService.user.email;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 40 ||     
    document.documentElement.scrollTop > 40) {
     this.scrollActive = true;
    } else {
      this.scrollActive = false;
    }
  }
}
