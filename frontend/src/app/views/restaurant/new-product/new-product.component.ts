import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
    
@Component({
    selector: 'app-login',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
    productForm: FormGroup;
    selectedCategory!:Category;
    categories: Category[];
    id:number;
    editMode:boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
    ) {
      this.id = this.route.snapshot.params['id'];
      this.editMode = this.id ? true:false;
      this.categories = [
        {
          id:1,
          name:"Breakfast"
        },
        {
          id:2,
          name:"Pizza"
        }, 
        {
          id:3,
          name:"Pasta"
        },
      ];
        this.productForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required]],
            category: new FormControl(null, [Validators.required]),
        });

        //Todo: 21.12.2021 (Faris) - Add guard to load product before page loads (or conditional rendenring)
        if(this.editMode) {
          fetch('https://fakestoreapi.com/products/' + this.id )
            .then(res=>res.json())
            .then(data=> {
              console.log(data)
              this.productForm.patchValue(data)
            })
        }
    }

    get f() {
        return this.productForm.controls;
    }

    ngOnInit(): void {}

     save() {
        if (this.productForm.valid) {
            if(!this.editMode)
              this.createProduct();
            else
              this.editProduct();
        } else {
            this.validateAllFields(this.productForm);
        }
     }

     createProduct() {
        let p = Object.assign(new Product(), this.productForm.value);
        console.log(p);
     }
     
     editProduct() {
      let p = Object.assign(new Product(), this.productForm.value);
      console.log(p);
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

