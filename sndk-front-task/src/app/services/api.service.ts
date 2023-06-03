import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { IUser } from '../constants/user';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  login(user: IUser): Observable<any> {
    return this.http.post(`/login`, user);
  }
  signup(user: IUser): Observable<any> {
    return this.http.post(`/signup`, user);
  }
  getUserDetail(userId: number): Observable<any> {
    return this.http.get(`/getuserdetail`);
  }
  getAllUserList(data: any): Observable<any> {
    return this.http.post(`/getuserlist`, data);
  }
  updateUserDetail(data: any): Observable<any> {
    return this.http.put(`/updateuser`, data);
  }
}
