import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONSTANTS } from 'src/app/constants/app.constant';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isSubmitted: boolean = false;
  public emailPattern =
    /^(("[\w-\s]+")|([\w-\+]+(?:\.[\w-\+]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  public passwordPattern =
    /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[0-9]).{6,15}$/;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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

  onSubmit() {
    console.log(this.loginForm.value);

    this.apiService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
    });
    this.localStorageService.setDetail(
      APP_CONSTANTS.USER,
      JSON.stringify(this.loginForm.value)
    );
    this.localStorageService.setDetail(
      APP_CONSTANTS.AUTH_TOKEN,
      'store token value'
    );
    this.router.navigateByUrl('home');
    this.userService.isLoggedIn = true;
    this.userService.notifyOther({ option: 'loggedIn', value: true });
  }
}
