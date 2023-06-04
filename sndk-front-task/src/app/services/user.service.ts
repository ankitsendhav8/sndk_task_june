import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { APP_CONSTANTS } from '../constants/app.constant';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { IUser } from '../constants/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: boolean = false;
  public isLoading: boolean = false;
  public userDetails!: IUser;
  notify = new Subject<{ option: string; value: any }>();
  notifyObservable$ = this.notify.asObservable();

  constructor(
    private localstorageService: LocalstorageService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.isUserLoggedIn();
    this.userDetails = JSON.parse(
      this.localstorageService.getDetail(APP_CONSTANTS.USER)
    );
  }
  notifyOther(data: { option: string; value: any }): void {
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
    this.apiService.logout(this.userDetails['id']).subscribe((resp) => {
      if (resp && resp.success) {
        this.notifyOther({ option: 'logout', value: true });
        this.isLoggedIn = false;
        this.router.navigateByUrl('login');
        this.localstorageService.clearAllDetail();
      }
    });
  }
  getUserDetail() {
    this.userDetails = JSON.parse(
      this.localstorageService.getDetail(APP_CONSTANTS.USER)
    );
    return this.userDetails;
  }
}
