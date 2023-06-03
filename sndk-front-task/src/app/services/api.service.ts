import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { IUser } from '../constants/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  login(user: IUser): Observable<any> {
    return this.httpClient.post(`/login`, user);
  }
  signup(user: IUser): Observable<any> {
    return this.httpClient.post(`/signup`, user);
  }
  getUserDetail(userId: number): Observable<any> {
    return this.httpClient.get(`/getuserdetail`);
  }
  getAllUserList(data: any): Observable<any> {
    return this.httpClient.post(`/getuserlist`, data);
  }
  updateUserDetail(data: any): Observable<any> {
    return this.httpClient.put(`/updateuser`, data);
  }
}
