import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, AuthenticatedUser } from '../model/user.interface';
import { ErrorMessage } from '../model/error.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = '/api/users';

  constructor(private http: HttpClient) {}

  login(userData: User) {
    return this.http.post<AuthenticatedUser | ErrorMessage>(
      `${this.baseUrl}/authenticate`,
      userData
    );
  }

  register(userData: User) {
    console.log('usao u register');
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  
}
