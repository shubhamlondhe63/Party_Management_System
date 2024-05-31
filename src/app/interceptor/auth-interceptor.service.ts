import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast'; // Import HotToastService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toast: HotToastService) {} // Inject HotToastService

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          'Authorization': `Token ${token}`
        }
      });

      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Interceptor error:', error);
          this.toast.error('An error occurred while processing your request. Please try again.'); // Display error toast
          return throwError(error); // Re-throw the error to be handled by the subscriber
        })
      );
    }

    console.warn('Interceptor - No token found in localStorage');
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Interceptor error:', error);
        this.toast.error('An error occurred while processing your request. Please try again.'); // Display error toast
        return throwError(error); // Re-throw the error to be handled by the subscriber
      })
    );
  }
}
