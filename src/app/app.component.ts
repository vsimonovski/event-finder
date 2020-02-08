import { Component, OnInit } from '@angular/core';
import { FakeBackendInterceptor } from './fake-backend.interceptor';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pki-projekat';
  isAuthenticated: Boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
