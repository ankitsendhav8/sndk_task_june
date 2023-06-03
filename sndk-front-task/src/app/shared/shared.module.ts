import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LocalstorageService } from '../services/localstorage.service';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService, LocalstorageService, ApiService],
})
export class SharedModule {}
