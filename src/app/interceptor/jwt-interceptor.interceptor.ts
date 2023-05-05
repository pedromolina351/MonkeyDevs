import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  cookieService: any;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.cookieService.get('token');
    let req = request;
    if(token){
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse)=>{
        console.log(err);
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${err.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Código de error: ${err.status}\nMensaje: ${err.message}`;
        }
        return throwError(errorMessage);
      })
    )
  }
}
