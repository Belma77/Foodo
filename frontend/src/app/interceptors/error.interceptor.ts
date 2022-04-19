import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {

          let errorMessage = '';

          if (error.error instanceof ErrorEvent){
            // client-side error
            errorMessage="Ups... Nešto je pošlo po zlu";
          }
          else {
            // server-side error
            switch (error.status) {
              case 401: {
                errorMessage = "Email ili password nije ispravan";
                break;
              }
              case 409:{
                errorMessage = "Racun s unijetom e-mail adresom vec postoji";
                break;}
              default:errorMessage = "Nepoznat error";
            }

            }
          return throwError(errorMessage);
        })
      )
  }
  }
