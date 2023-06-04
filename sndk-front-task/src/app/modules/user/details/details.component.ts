import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/constants/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public userId!: number;
  public userDetail!: IUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    if (this.userId) {
      this.getUserDetail();
    }
  }
  getUserDetail() {
    this.apiService.getUserDetail(this.userId).subscribe((response: any) => {
      console.log(response);
    });
    this.userDetail = {
      id: 15,
      firstName: 'string tb data',
      lastName: 'string tb data',
      profileImage: '/assets/image/sndklogo.png',
      email: 'string tb data',
      fullName: 'string tb data',
      status: 'active',
    };
  }
}
