import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticatedUser } from '../shared/model/user.interface';
import { ErrorMessage } from '../shared/model/error.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  submit() {
    const { username, password } = this.form.value;

    this.subscriptions.add(
      this.authService.login({ username, password }).subscribe(
        (data: AuthenticatedUser) => {
          this.toastr.success('', `${data.username} succesfuly logged in`, {});
          localStorage.setItem('isAuthenticated', 'true');
          this.router.navigate(['']);
        },
        (err: ErrorMessage) => {
          this.toastr.error('', err.message, {});
          localStorage.setItem('isAuthenticated', 'false');
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
