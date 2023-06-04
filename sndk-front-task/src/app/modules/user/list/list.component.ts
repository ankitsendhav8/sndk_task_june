import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/constants/user';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public allUser: IUser[] = [];
  public searchText: string = '';
  public selectedStatus: string = '';
  public allStatus: { label: string; value: string }[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.allUser = [
      {
        id: 15,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'active',
      },
      {
        id: 15,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'inactive',
      },
      {
        id: 15,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'active',
      },
      {
        id: 15,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'inactive',
      },
      {
        id: 15,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'active',
      },
      {
        id: 15,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'active',
      },
    ];
    this.allStatus = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    this.getAllUserList();
  }
  getAllUserList() {
    let data: any = { page: 1, limit: 10 };
    if (this.searchText) {
      data.keyword = this.searchText;
    }
    if (this.selectedStatus) {
      data.filter.push({ key: 'status', value: this.selectedStatus });
    }

    this.apiService.getAllUserList(data).subscribe((response) => {
      console.log(response);
    });
  }
  changeStatus() {
    console.log(this.selectedStatus);
    this.getAllUserList();
  }
  searchUser() {
    if (this.searchText.length >= 3) {
      this.getAllUserList();
    }
    console.log('search text ', this.searchText);
  }
}
