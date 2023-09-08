// login.services
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public loginStatusSubject = new Subject<boolean>();

  // Current User: whiche is loggedIn
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Generating token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Login User - Storing token in local Storage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // IsLogin: User is Logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // Logout : Remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Get token function
  public getToken() {
    return localStorage.getItem('token');
  }

  // set userdetails
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user function
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // Get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
