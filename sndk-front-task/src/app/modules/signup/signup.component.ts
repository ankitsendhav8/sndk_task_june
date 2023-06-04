import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public isSubmitted: boolean = false;
  public showPassword: boolean = false;
  public emailPattern =
    /^(("[\w-\s]+")|([\w-\+]+(?:\.[\w-\+]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  public passwordPattern =
    /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[0-9]).{6,15}$/;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }
  get emailControl() {
    return this.signupForm.get('email');
  }
  get passwordControl() {
    return this.signupForm.get('password');
  }
  get fNameControl() {
    return this.signupForm.get('firstName');
  }
  get lNameControl() {
    return this.signupForm.get('lastName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.signupForm.valid) {
      let data = this.signupForm.value;
      data.fullName = data.firstName + ' ' + data.lastName;

      this.apiService.signup(data).subscribe((response) => {
        this.isSubmitted = false;
        if (response && response.success) {
          this.router.navigateByUrl('login');
        }
      });
    }
  }
}
