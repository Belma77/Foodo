import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
  
    
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    userService: any;
    authService: any;

    constructor(
        private fb: FormBuilder,
        userService:UserService,
        authService:AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rememberMe: [false],
        });
        this.userService=userService;
        this.authService=authService;
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit(): void {}

     save() {
        if (this.loginForm.valid) {
            this.userService
                .login(this.loginForm.value)
                .then(() => {
                    this.loginForm.reset();
                })
                .catch(() => {
                    this.loginForm.reset();
                });
        } else {
            this.validateAllFields(this.loginForm);
        }
     }
   

    signInWithGoogle(): void {
        this.userService.googlePopupLogin()
        .finally(() => {
            this.loginForm.reset();
        })
    }

     signOut(): void {
        this.authService.signOut();
    }

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

