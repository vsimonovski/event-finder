import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MustMatch } from '../shared/helpers/must-match.validator';
import { ErrorMessage } from '../shared/model/error.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  submit() {
    const { username, password } = this.form.value;
    localStorage.setItem('isAuthenticated', 'false');

    this.subscriptions.add(
      this.authService.register({ username, password }).subscribe(
        () => {
          localStorage.setItem('isAuthenticated', 'true');
          this.toastr.success('', `User '${username}' succesfuly created`, {});
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
    this.form = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }
}
