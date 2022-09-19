import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollActive = false;


  constructor(private authService:AuthService, private userService:UserService) { }

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
