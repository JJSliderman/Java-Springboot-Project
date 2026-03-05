// app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  username: string;
  name: string;
  password: string;
  age: number;
}

export interface AlteredUser {
  username: string;
  name: string;
  password: string;
  age: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user/';

  constructor(private http: HttpClient) {}

  // GET request
  getUsers(username: string, password: string): Observable<User[]> {
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http
      .get<User[]>(this.apiUrl.concat('retrieve'), { params })
      .pipe(catchError(this.handleError));
  }

  getGreeting(name: string): Observable<string> {
    let params = new HttpParams().set('name', name);
    return this.http
      .get(this.apiUrl.concat('greet'), { params, responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // POST request
  addUser(user: Partial<User>): Observable<string> {
    return this.http
      .post(this.apiUrl.concat('addUser'), user, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  editUser(user: Partial<User>): Observable<string> {
    return this.http
      .put(this.apiUrl.concat('editUser'), user, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  deleteUser(username: string): Observable<string> {
    return this.http
      .delete(this.apiUrl.concat(username), { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong with the API call.'));
  }
}
