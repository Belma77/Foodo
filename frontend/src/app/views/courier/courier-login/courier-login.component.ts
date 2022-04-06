import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courier-login',
  templateUrl: './courier-login.component.html',
  styleUrls: ['./courier-login.component.scss']
})
export class CourierLoginComponent implements OnInit {
  loginForm: FormGroup;
  userService: any;
  authService: any;
  router:any;
  constructor(
    private fb: FormBuilder,
    userService:UserService,
    authService:AuthService,
    router:Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],

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
        .courierLogin(this.loginForm.value)
        .then((response:any) => {

          // this.loginForm.reset();
          console.log("logiran");

        })
        .catch((err:any) => {
          //this.loginForm.reset();
          console.log(err);
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
