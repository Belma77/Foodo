import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
  
    
@Component({
    selector: 'app-login',
    templateUrl: './login-restaurant.component.html',
    styleUrls: ['./login-restaurant.component.scss'],
})
export class LoginComponentRestaurant implements OnInit {
    loginForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private resService:RestaurantService,
        private authService:AuthService,
        private router:Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rememberMe: [false],
        });
        
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit(): void {}

     save() {
        if (this.loginForm.valid) {
            this.resService
                .login(this.loginForm.value)
                .then(() => {
                     
                    // this.loginForm.reset();
            
                    console.log("logiran");
                    // this.router.navigateByUrl('/home-page');
                })
                .catch(() => {
                    this.loginForm.reset();
                });
        } else {
            this.validateAllFields(this.loginForm);
        }
     }
   

    // signInWithGoogle(): void {
    //     this.resService.googlePopupLogin()
    //     .finally(() => {
    //         this.loginForm.reset();
    //     })
    // }

    //  signOut(): void {
    //     this.authService.signOut();
    // }

    validateAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
     }
}


