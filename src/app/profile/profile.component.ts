import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageUser } from '../shared/model/user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  users: LocalStorageUser[];
  currUserId: number;

  constructor(private fb: FormBuilder, private toast: ToastrService) {}

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users'));
    this.currUserId = Number(localStorage.getItem('currentUserId'));

    const [currentUser] = this.users.filter(
      (user) => user.id === this.currUserId
    );

    this.createForm(currentUser);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    const { username, password } = this.form.value;

    const tmpUsers = this.users.map((user) => {
      if (user.id === this.currUserId) {
        user.username = username;
        user.password = password;
        return user;
      }

      return user;
    });

    localStorage.setItem('users', JSON.stringify(tmpUsers));
    this.toast.success('User data updated');
  }

  private createForm({ username, password }) {
    this.form = this.fb.group({
      username: [username, [Validators.required]],
      password: [password, [Validators.required]],
    });
  }
}
