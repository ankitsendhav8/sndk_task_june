import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from 'src/app/services/auth/session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth: SessionService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any> | any> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.auth.logout();
        } else if (err.status === 402) {
          this.router.navigate(['pricing']);
        } else if (err.status === 403) {
          this.auth.logout();
        }
        return throwError(err);
      })
    );
  }
}
