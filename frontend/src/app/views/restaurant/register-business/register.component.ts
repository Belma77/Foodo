import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import * as regex from '../../../utils/regex';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-restaurant-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RestaurantRegisterComponent implements OnInit {

    registerForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private restaurantService: RestaurantService,
        private router: Router,
    ) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(regex.email)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            city: ['', [Validators.required]],
            businesName:['', [Validators.required]],
            phone:['', [Validators.required]],
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit(): void {}

     save() {
        if (this.registerForm.valid) {
            this.restaurantService
                .register(this.registerForm.value)
                .then(() => {
                    // this.registerForm.reset();
                    console.log("registrovan");
                    this.router.navigateByUrl('/login-restaurant');
                }).catch(err => console.log(err));
                // .catch(() => {
                //     this.registerForm.reset();
                // });
        } else {
            this.validateAllFields(this.registerForm);
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

}
