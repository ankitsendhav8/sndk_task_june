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
  public itemsPerPage: number = 5;
  public totalUsers!: number;
  pagedItems: IUser[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.allStatus = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    this.getAllUserList();
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
      if (response && response.data) {
        this.allUser = response.data;
        this.totalUsers = this.allUser.length;
        this.loadItems();
      }
    });
  }

  changeStatus() {
    this.pagedItems = this.allUser.filter(
      (res) => res.status === this.selectedStatus
    );
    this.totalUsers = this.pagedItems.length;
    this.currentPage = 1;
  }
  searchUser() {
    if (this.searchText.length >= 3) {
      this.pagedItems = this.allUser.filter(
        (user) =>
          user.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
          user.firstName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.totalUsers = this.pagedItems.length;
      this.currentPage = 1;
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
