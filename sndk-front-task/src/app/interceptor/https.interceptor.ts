import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LocalstorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';
import { APP_CONSTANTS } from '../constants/app.constant';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  public token: string = '';
  private readonly excludedEndpoints: string[] = ['/login', '/signup'];

  constructor(
    private userService: UserService,
    private localstorageService: LocalstorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const regExp = new RegExp(/assets/g, 'i');
    let newReq;
    if (!this.isExcludedEndpoint(request.url)) {
      const token = this.localstorageService.getDetail(
        APP_CONSTANTS.AUTH_TOKEN
      );

      newReq = request.clone({
        url: regExp.test(request.url)
          ? request.url
          : `${environment.serviceUrl}${request.url}`,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      newReq = request.clone({
        url: regExp.test(request.url)
          ? request.url
          : `${environment.serviceUrl}${request.url}`,
      });
    }

    return next.handle(newReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            /* do stuff with response if you want*/
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            /* Handle error here */
            if (err.status === 400) {
              this.userService.logout();
            }
          }
          return observableThrowError(
            new Error('Internal server error occurred!')
          );
        }
      )
    );
  }
  private isExcludedEndpoint(url: string): boolean {
    return this.excludedEndpoints.some((endpoint) => url.endsWith(endpoint));
  }
}
