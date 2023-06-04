import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { APP_CONSTANTS } from '../constants/app.constant';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: boolean = false;
  notify = new Subject<{ option: string; value: any }>();
  notifyObservable$ = this.notify.asObservable();

  constructor(
    private localstorageService: LocalstorageService,
    private router: Router
  ) {
    this.isUserLoggedIn();
  }
  notifyOther(data: { option: string; value: any }): void {
    console.log('notify', data);
    if (data) {
      this.notify.next(data);
    }
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.localstorageService.getDetail(
      APP_CONSTANTS.AUTH_TOKEN
    )
      ? true
      : false;
    return this.isLoggedIn;
  }
  logout() {
    this.isLoggedIn = false;
    this.router.navigateByUrl('login');
    this.localstorageService.clearAllDetail();
    this.notifyOther({ option: 'logout', value: true });
  }
  getUserDetail() {
    return JSON.parse(this.localstorageService.getDetail(APP_CONSTANTS.USER));
  }
}
