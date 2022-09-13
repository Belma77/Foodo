import { compileNgModule, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { environment } from 'src/environments/environment';

    
@Component({
    selector: 'app-login',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
    productForm: FormGroup;
    selectedCategory!:Category;
    id:number;
    editMode:boolean = false;
    editImage: boolean = false;
    image:string | null = null;

    files: File[] = [];
    fileError: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private restaurantService:RestaurantService
    ) {
      this.id = this.route.snapshot.params['id'];
      this.editMode = this.id ? true:false;
    
      this.productForm = this.fb.group({
          name: ['', [Validators.required]],
          description: ['', [Validators.required]],
          price: ['', [Validators.required]],
          category: new FormControl(null, [Validators.required]),
      });

        //Todo: 21.12.2021 (Faris) - Add guard to load product before page loads (or conditional rendenring)
        if(this.editMode) {
          this.restaurantService.getProductById(this.id)
            .then(data=> {
                console.log(data)
                this.productForm.patchValue(data)
                this.productForm.controls['category'].setValue(data.category.id)
                this.image = data.image;
            })
        }
    }

    save() {
      this.validateAllFields(this.productForm);
      let p = Object.assign(new Product(), this.productForm.value);
      console.log(p)
      let formData = new FormData();
      formData.append('body', JSON.stringify(p));
      if (this.files[0])
        formData.append('file', this.files[0], this.files[0].name);
      console.log("salje se")
      if(!this.editMode) 
        this.restaurantService.addProduct(formData);
      else 
        this.restaurantService.updateProduct(formData, this.id);
    }

    get f() {
      return this.productForm.controls;
    }

    get categories() {
      return this.restaurantService.categories;
    }

    ngOnInit(): void {}

    validateAllFields(formGroup: FormGroup) {

        if(this.files.length == 0  && !this.editMode || (this.files.length == 0 && this.editMode && !this.image)) {
          console.log("file error")
              this.fileError = true;
        }
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
     }

  
     onSelect(event:any) {
      this.files.push(...event.addedFiles);
      this.fileError = false;
    }
    
    onRemove(event:any) {
      this.files.splice(this.files.indexOf(event), 1);
    }

    setEditImage() {
      this.editImage = !this.editImage;
    }

    get imageUrl() {
      return environment.api + "/download?fileUrl=" + this.image;
    }
}


