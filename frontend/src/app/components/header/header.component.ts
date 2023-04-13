import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/models/location';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewsComponent } from 'src/app/views/customer/reviews/reviews.component';
import { UsedAdressesComponent } from 'src/app/views/customer/used-adresses/used-adresses.component';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollActive = false;
  currentAdress!:Location;
adressExists:boolean=false;

  constructor(private authService:AuthService, private userService:UserService, private service:ReviewsService, private modal:NgbModal,
    private locationService:LocationService,
    private router:Router) { }

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
  
  setLocation()
  {
    this.locationService.GetLocation().then(x=>{
      console.log(x);
      this.currentAdress=x;

    if(this.currentAdress === null)
    {
      this.router.navigate(['/pick-location']);
    } 

    else
    {
     const ModalRef=this.modal.open(UsedAdressesComponent);
    }

    })
   
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
