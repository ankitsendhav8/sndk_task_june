import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/constants/user';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userDetails!: IUser;
  public profileForm!: FormGroup;
  public isSubmitted: boolean = false;
  public emailPattern =
    /^(("[\w-\s]+")|([\w-\+]+(?:\.[\w-\+]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  public passwordPattern =
    /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[0-9]).{6,15}$/;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
    this.userDetails = this.userService.getUserDetail();
    if (this.userDetails) {
      this.profileForm.patchValue(this.userDetails);
    }
  }
  updateDetail() {
    let data = this.profileForm.value;
    let formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);

    this.apiService.updateUserDetail(formData).subscribe((response) => {
      console.log(response);
    });
  }
}
