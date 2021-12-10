import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'rxjs';
// import { NotificationService } from './notification.service';
import { Observable, throwError, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';

@Injectable()
export class CoreRequestService {
    constructor(
        private http: HttpClient,
        // private notificationService: NotificationService,
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

    // public delete(path: string): Promise<any> {
    //     this.spinerService.show();
    //     return this.http
    //         .delete(environment.api.concat(path))
    //         .toPromise()
    //         .then((data: any) => {
    //             this.spinerService.hide();
    //             return data;
    //         })
    //         .catch((err) => {
    //             this.spinerService.hide();
    //             this.handleError(err);
    //             throw err;
    //         });
    // }
    // public put(path: string, body: any): Promise<any> {
    //     this.spinerService.show();
    //     return this.http
    //         .put(environment.api.concat(path), body)
    //         .toPromise()
    //         .then((data: any) => {
    //             this.spinerService.hide();
    //             return data;
    //         })
    //         .catch((err) => {
    //             this.spinerService.hide();
    //             this.handleError(err);
    //             throw err;
    //         });
    // }
    // public patch(path: string, body: any): Promise<any> {
    //     return this.http
    //         .patch(environment.api.concat(path), body)
    //         .toPromise()
    //         .catch((err) => {
    //             return this.handleError(err);
    //         });
    // }

    // public handleError(error: any): Observable<any> {
    //     switch (error.status) {
    //         case 400:
    //             if (error.error.hasOwnProperty('ModelState')) {
    //                 return throwError(error.error.ModelState);
    //             }
    //             if (error.error.hasOwnProperty('Message')) {
    //                 this.notificationService.error(
    //                     error.error.Message,
    //                     'ERROR'.concat(error.status)
    //                 );
    //                 return of();
    //             }
    //             if (error.error != null) {
    //                 if (error.error) {
    //                     let valError = error.error[Object.keys(error.error)[0]];
    //                     this.notificationService.error(
    //                         valError[0],
    //                         'ERROR'.concat(error.status)
    //                     );
    //                 } else
    //                     this.notificationService.error(
    //                         error.error,
    //                         'ERROR'.concat(error.status)
    //                     );
    //                 return of();
    //             }
    //             this.notificationService.error(
    //                 error.error,
    //                 'ERROR'.concat(error.status)
    //             );
    //             return of();
    //         case 0:
    //             this.notificationService.error(
    //                 'UNABLE_TO_CONNECT_API',
    //                 'ERROR'.concat(error.status)
    //             );
    //             return of();
    //         case 403:
    //             this.notificationService.error(
    //                 'YOU_DONT_HAVE_PERMISSIONS',
    //                 'ERROR'.concat(error.status)
    //             );
    //             return of();
    //         case 401:
    //             if (error.error)
    //                 this.notificationService.error(error.status, error.error);
    //             else
    //                 this.notificationService.error(
    //                     error.status,
    //                     error.statusText
    //                 );
    //             return of();
    //         default:
    //             this.notificationService.error(
    //                 error.statusText,
    //                 'ERROR'.concat(error.status)
    //             );
    //             return of();
    //     }
    // }

    // public postFiles(path: string, files: File[], body: any): Promise<any> {
    //     const formData: FormData = new FormData();
    //     files.forEach((element) => {
    //         formData.append('file', element, element.name);
    //     });
    //     formData.append('body', body);

    //     return this.http
    //         .put(environment.api.concat(path), formData, {
    //             withCredentials: true,
    //         })
    //         .toPromise()
    //         .then((data: any) => {
    //             this.spinerService.hide();
    //             return data;
    //         })
    //         .catch((err) => {
    //             this.spinerService.hide();
    //             this.handleError(err);
    //             throw err;
    //         });
    // }

    // getNotifications() {
    //     return this.http
    //         .get(environment.api.concat('/notifications'))
    //         .toPromise()
    //         .then((data: any) => {
    //             return data;
    //         })
    //         .catch((err) => {
    //             throw err;
    //         });
    // }

    // updateNotificationStatus(id:number) {
    //     return this.http
    //         .patch(environment.api.concat(`/notification/${id}/status`), {})
    //         .toPromise()
    //         .then((data: any) => {
    //             return data;
    //         })
    //         .catch((err) => {
    //             throw err;
    //         });
    // }
}
