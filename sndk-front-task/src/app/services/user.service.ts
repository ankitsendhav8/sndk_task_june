import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { APP_CONSTANTS } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: boolean = false;
  constructor(private localstorageService: LocalstorageService) {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.localstorageService.getDetail(
      APP_CONSTANTS.AUTH_TOKEN
    )
      ? true
      : false;
    return this.isLoggedIn;
  }
}
