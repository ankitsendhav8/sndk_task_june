import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    if (this.userId) {
      this.getUserDetail();
    }
  }
  /* Get user details and if details not found redirecting to users list page*/
  getUserDetail() {
    this.apiService.getUserDetail(this.userId).subscribe((response: any) => {
      if (response && response.success) {
        this.userDetail = response.data;
      } else {
        this.router.navigateByUrl('user');
      }
    });
  }
}
