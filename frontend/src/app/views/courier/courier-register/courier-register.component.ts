import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import * as regex from "../../../utils/regex";

@Component({
  selector: 'app-courier-register',
  templateUrl: './courier-register.component.html',
  styleUrls: ['./courier-register.component.scss']
})
export class CourierRegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(regex.email)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}

  save() {
    if (this.registerForm.valid) {
      this.userService
        .courierRegister(this.registerForm.value)
        .then(() => {

        })
        .catch((err) => {
          this.error=err;
        });
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
