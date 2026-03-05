import { Component, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlteredUser, User, UserService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fields',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.css',
})
export class AppComponent {
  data: AlteredUser = {
    username: '',
    password: '',
    name: '',
    age: '',
  };

  usernameError: { error: boolean; helperText: string } = { error: false, helperText: '' };
  passwordError: { error: boolean; helperText: string } = { error: false, helperText: '' };
  ageError: { error: boolean; helperText: string } = { error: false, helperText: '' };
  existingUser: boolean = false;
  anchor: EventTarget | null = null;
  message = '';

  constructor(private api: UserService) {}

  setAnchor(element: EventTarget | null) {
    this.anchor = element;
  }

  changeDataName(value: string) {
    this.data.name = value;
  }
  changeDataUsername(value: string) {
    this.data.username = value;
  }
  changeDataPassword(value: string) {
    this.data.password = value;
  }
  changeDataAge(value: string) {
    this.data.age = value;
  }
  blurDataAge() {
    if (Number.isNaN(Number(this.data.age)) && this.data.age != '') {
      this.ageError = { error: true, helperText: 'Must be either null or real number' };
    } else {
      this.ageError = { error: false, helperText: '' };
    }
  }
  blurDataUsername() {
    if (this.data.username == '') {
      this.usernameError = { error: true, helperText: 'Must be non-null' };
    } else {
      this.usernameError = { error: false, helperText: '' };
    }
  }
  blurDataPassword() {
    if (this.data.password == '') {
      this.passwordError = { error: true, helperText: 'Must be non-null' };
    } else {
      this.passwordError = { error: false, helperText: '' };
    }
  }

  close() {
    this.existingUser = false;
    this.anchor = null;
    this.data = { username: '', password: '', age: '', name: '' };
    this.usernameError = { error: false, helperText: '' };
    this.ageError = { error: false, helperText: '' };
    this.passwordError = { error: false, helperText: '' };
  }

  fetchData(target: EventTarget | null) {
    // Example GET with parameters
    this.api.getUsers(this.user, this.password).subscribe({
      next: (res) => {
        if (res.length == 0) {
          this.message = 'No users with this information exist!';
        } else {
          this.data = { ...res[0], age: res[0].age.toString() };
          this.message = `User of username ${res[0].username} has been retrieved!`;
          this.setAnchor(target);
          this.existingUser = true;
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = `No users with this information exist!`;
      },
    });
  }

  fetchGreeting() {
    // Example GET with parameters
    this.api.getGreeting(this.name).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res;
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Could not retrieve greeting!';
      },
    });
  }

  deleteUser() {
    this.api.deleteUser(this.data.username).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res;
        this.close();
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Could not delete user!';
      },
    });
  }
  editUser() {
    if (
      this.existingUser &&
      !this.usernameError.error &&
      !this.passwordError.error &&
      !this.ageError.error
    ) {
      const newUser = { ...this.data, age: Number(this.data.age) };
      this.api.editUser(newUser).subscribe({
        next: (res) => {
          console.log(res);
          this.message = res;
          this.close();
        },
        error: (err) => {
          console.error('Error:', err);
          this.message = 'Could not edit user!';
        },
      });
    } else {
      if (Number.isNaN(Number(this.data.age)) && this.data.age !== '') {
        this.ageError = { error: true, helperText: 'Must be either null or real number' };
      }
      if (this.data.username === '') {
        this.usernameError = { error: true, helperText: 'Must be non-null' };
      }
      if (this.data.password === '') {
        this.passwordError = { error: true, helperText: 'Must be non-null' };
      }
    }
  }
  createUser() {
    if (!this.usernameError.error && !this.passwordError.error && !this.ageError.error) {
      const newUser = { ...this.data, age: Number(this.data.age) };
      this.api.addUser(newUser).subscribe({
        next: (res) => {
          console.log(res);
          this.message = res;
          this.close();
        },
        error: (err) => {
          console.error('Error:', err);
          this.message = 'Could not add user!';
        },
      });
    } else {
      if (Number.isNaN(Number(this.data.age)) && this.data.age !== '') {
        this.ageError = { error: true, helperText: 'Must be either null or real number' };
      }
      if (this.data.username === '') {
        this.usernameError = { error: true, helperText: 'Must be non-null' };
      }
      if (this.data.password === '') {
        this.passwordError = { error: true, helperText: 'Must be non-null' };
      }
    }
  }

  // Example POST
  // this.api.postData({ name: 'Test' }).subscribe(console.log);
  name: string = '';

  changeValue(text: string) {
    this.name = text;
  }

  user: string = '';

  changeUserValue(text: string) {
    this.user = text;
  }

  password: string = '';

  changePasswordValue(text: string) {
    this.password = text;
  }
}
