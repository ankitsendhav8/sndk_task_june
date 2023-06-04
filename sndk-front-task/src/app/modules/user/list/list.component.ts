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
  public currentPage: number = 1;
  public itemsPerPage: number = 2;
  public totalUsers!: number;
  pagedItems: IUser[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.allUser = [
      {
        id: 7,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'active',
      },
      {
        id: 2,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'inactive',
      },
      {
        id: 3,
        firstName: 'string tb data',
        lastName: 'string tb data',
        profileImage: 'string tb data',
        email: 'string tb data',
        fullName: 'string tb data',
        status: 'active',
      },
      {
        id: 4,
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
    this.totalUsers = this.allUser.length;
    this.allStatus = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    // this.getAllUserList();
    this.loadItems();
  }

  /* Getting all users list  */
  getAllUserList() {
    let data: any;
    if (this.searchText) {
      data.keyword = this.searchText;
    }
    if (this.selectedStatus) {
      data.filter.push({ key: 'status', value: this.selectedStatus });
    }

    this.apiService.getAllUserList(data).subscribe((response) => {
      console.log(response);
      this.loadItems();
    });
  }

  changeStatus() {
    this.getAllUserList();
  }
  searchUser() {
    if (this.searchText.length >= 3) {
      this.getAllUserList();
    }
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.loadItems();
  }

  /*Filter logic for listing implemented here on Page change  */
  loadItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = this.allUser.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
