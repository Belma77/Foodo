import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'rxjs';
import { Observable, throwError, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CoreRequestService {
    constructor(
        private http: HttpClient,
        private spinerService: NgxSpinnerService,
        private authService:AuthService
    ) {}
    public get(path: string): Promise<any> {
        this.spinerService.show();
        return this.http
            .get(environment.api.concat(path))
            .toPromise()
            .then((data: any) => {
                this.spinerService.hide();
                return data;
            })
            .catch((err) => {
                this.spinerService.hide();
                // this.handleError(err);
                throw err;
            });
    }
    public post(path: string, body: any): Promise<any> {
        this.spinerService.show();
        return this.http
            .post(environment.api.concat(path), body)
            .toPromise()
            .then((data: any) => {
                this.spinerService.hide();
                return data;
            })
            .catch((err) => {
                this.spinerService.hide();
                // this.handleError(err);
                throw err;
            });
    }

    public delete(path: string): Promise<any> {
        this.spinerService.show();
        return this.http
            .delete(environment.api.concat(path))
            .toPromise()
            .then((data: any) => {
                this.spinerService.hide();
                return data;
            })
            .catch((err) => {
                this.spinerService.hide();
                // this.handleError(err);
                throw err;
            });
    }
    public put(path: string, body: any): Promise<any> {
        this.spinerService.show();
        return this.http
            .put(environment.api.concat(path), body)
            .toPromise()
            .then((data: any) => {
                this.spinerService.hide();
                return data;
            })
            .catch((err) => {
                this.spinerService.hide();
                // this.handleError(err);
                throw err;
            });
    }

    public patch(path: string, body: any): Promise<any> {
        return this.http
            .patch(environment.api.concat(path), body)
            .toPromise()
            .catch((err) => {
                this.spinerService.hide();
                // this.handleError(err);
                throw err;
            });
    }
}