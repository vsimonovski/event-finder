import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, AuthenticatedUser } from '../model/user.interface';
import { ErrorMessage } from '../model/error.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = '/api/users';
  isAuth: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isAuth = new BehaviorSubject(!!localStorage.getItem('users'));
  }

  login(userData: User) {
    return this.http.post<AuthenticatedUser | ErrorMessage>(
      `${this.baseUrl}/authenticate`,
      userData
    );
  }

  logout() {
    localStorage.removeItem('eventsHistory');
    this.setAuthStatus(false);
  }

  register(userData: User) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  setAuthStatus(val): void {
    this.isAuth.next(val);
  }
}
