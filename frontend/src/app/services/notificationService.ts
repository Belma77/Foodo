import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { AuthService } from './auth.service';
import { CoreRequestService } from './core-request.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastr: ToastrService
  ) {
    toastr.toastrConfig.timeOut = 1500;
  }

  error(err: string, desc: string) {
    this.toastr.error(err, desc);
  }

  success(desc:string) {
    this.toastr.success(desc)
  }

  fail(desc:string){
    this.toastr.error(desc)
  }

  successLogin() {
    this.toastr.success('login Success', 'Success');
  }
  failedLogin() {
    this.toastr.error('login failed', 'failed');
  }
}
