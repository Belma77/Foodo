import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as regex from '../../utils/regex';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(regex.email)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
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
                .register(this.registerForm.value)
                .then(() => {
                    // this.registerForm.reset();
                    this.router.navigateByUrl('/login');
                    
                })
                .catch(() => {
                    this.registerForm.reset();
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
