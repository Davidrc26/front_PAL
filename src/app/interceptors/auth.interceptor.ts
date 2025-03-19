// filepath: c:\Users\david\OneDrive\Escritorio\ProjectsUC\spring\proyecto\front_PAL\src\app\interceptors\auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(clonedRequest);
  }
}