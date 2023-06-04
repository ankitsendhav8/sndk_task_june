import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isUserLoggedIn();
    this.userService.notifyObservable$.subscribe((res) => {
      if (res.option === 'loggedIn') {
        this.isLoggedIn = true;
      }
      if (res.option === 'logout') {
        this.isLoggedIn = false;
      }
    });
  }
}
