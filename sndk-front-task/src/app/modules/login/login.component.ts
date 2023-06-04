import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { APP_CONSTANTS } from 'src/app/constants/app.constant';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isSubmitted: boolean = false;
  public showPassword: boolean = false;
  public emailPattern =
    /^(("[\w-\s]+")|([\w-\+]+(?:\.[\w-\+]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  public passwordPattern =
    /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[0-9]).{6,15}$/;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }
  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      let data = this.loginForm.value;
      this.apiService.login(data).subscribe((response) => {
        this.isSubmitted = false;
        if (response && response.success) {
          this.userService.isLoggedIn = true;
          this.router.navigateByUrl('home');
          this.userService.notifyOther({ option: 'loggedin', value: true });

          this.localStorageService.setDetail(
            APP_CONSTANTS.USER,
            JSON.stringify(response.data)
          );
          this.localStorageService.setDetail(
            APP_CONSTANTS.AUTH_TOKEN,
            response.data.access_token
          );
        }
      });
    }
  }
}
