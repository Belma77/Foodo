import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { environment} from 'src/environments/environment';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedImg: String | null = null;

  newImage!: File;

  profileForm: FormGroup;

  constructor(private userService:UserService, private restaurantServie: RestaurantService, private fb: FormBuilder,
              private authService:AuthService,
              private router:Router) {
    if (this.user.headerImage)
      this.selectedImg = environment.api + "/download?fileUrl=" + this.user.headerImage;

    this.profileForm = fb.group({
      name: ['', [Validators.required]]
    });

    if(this.user)
      this.profileForm.patchValue(this.user);

      console.log(this.profileForm.value)

  }

  ngOnInit(): void {
  }

  get user() {
    return this.userService.user as Restaurant;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.newImage = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedImg = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
  }
  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('login/business');

  }
  save() {
      let formData = new FormData();
      formData.append('body', JSON.stringify(this.profileForm.value));
      if(this.newImage)
        formData.append('file', this.newImage, this.newImage.name);

      // See if changes were made
      this.restaurantServie.updateProfile(formData)
      .then(res => window.location.reload());
      // catch and show failure popup
  }


}
