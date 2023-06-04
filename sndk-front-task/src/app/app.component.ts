import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LocalstorageService } from './services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  constructor(
    public userService: UserService,
    private router: Router,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isUserLoggedIn();
    this.userService.notifyObservable$.subscribe((res) => {
      console.log('notified result ', res);
      if (res.option === 'loggedIn') {
        this.isLoggedIn = true;
      }
      if (res.option === 'logout') {
        this.isLoggedIn = false;
      }
    });
  }
}
