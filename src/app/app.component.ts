import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pki-projekat';
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout();
  }
}
