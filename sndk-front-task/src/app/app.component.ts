import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLoggedIn = this.userService.isUserLoggedIn();
  }
  logoutUser() {
    console.log('logout user ');
  }
}
