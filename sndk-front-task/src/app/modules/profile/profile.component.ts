import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APP_CONSTANTS } from 'src/app/constants/app.constant';
import { IUser } from 'src/app/constants/user';

import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
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
  public profileImage: any;
  public profileImageData: any;
  public emailPattern =
    /^(("[\w-\s]+")|([\w-\+]+(?:\.[\w-\+]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  public passwordPattern =
    /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[0-9]).{6,15}$/;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public userService: UserService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      status: ['active', Validators.required],
    });
    this.userDetails = this.userService.getUserDetail();
    if (this.userDetails) {
      this.profileForm.patchValue(this.userDetails);
    }
  }
  get emailControl() {
    return this.profileForm.get('email');
  }

  get fNameControl() {
    return this.profileForm.get('firstName');
  }
  get lNameControl() {
    return this.profileForm.get('lastName');
  }
  onFileSelected(files: any): void {
    if (files.length > 0) {
      const fileToUpload = files.item(0);

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };

      reader.readAsDataURL(fileToUpload);

      this.profileImageData = fileToUpload;
    }
  }
  updateDetail() {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      let data = this.profileForm.value;
      data.fullName = data.firstName + ' ' + data.lastName;

      if (this.profileImageData) {
        let formData = new FormData();
        formData.append('profileImage', this.profileImageData);
        this.apiService
          .updateUserProfileImage(formData)
          .subscribe((resp: any) => {
            console.log(resp);
            this.isSubmitted = false;
            if (resp && resp.success) {
              data.profileImage = resp.data.image;
              this.updateUserDetails(data);
            }
          });
      } else {
        this.updateUserDetails(data);
      }
    }
  }
  updateUserDetails(data: any) {
    this.apiService
      .updateUserDetail(this.userDetails.id, data)
      .subscribe((response) => {
        this.isSubmitted = false;
        if (response && response.success) {
          this.localStorageService.setDetail(
            APP_CONSTANTS.USER,
            JSON.stringify(response.data)
          );
          this.userService.userDetails = response.data;
          this.userService.notifyOther({
            option: 'profileUpdate',
            value: true,
          });
        }
      });
  }
}
