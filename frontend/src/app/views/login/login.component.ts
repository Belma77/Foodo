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
import { first } from 'rxjs/operators';
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
    router:any;
  error: any;
    constructor(
        private fb: FormBuilder,
        userService:UserService,
        authService:AuthService,
        router:Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rememberMe: [false],
        });
        this.userService=userService;
        this.authService=authService;
        this.router=router;
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit(): void {}

     save() {
        if (this.loginForm.valid) {
            this.userService
                .login(this.loginForm.value)
                .then((response:any) => {
                })
                .catch((err:any) => {
                    this.error=err;
                });
        } else {
            this.validateAllFields(this.loginForm);
        }
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

      signOut(): void {
         this.authService.signOut();
    }


}

