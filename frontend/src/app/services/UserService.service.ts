import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from "../models/user.model";
import { tap } from "rxjs";
import { catchError } from 'rxjs/operators';
import { SaveUser } from "./SaveUser.service";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'http://localhost:8080/api/open';
  private usersUrl2 = 'http://localhost:8080/api/users';
  private apiUrl = 'http://localhost:8080/api/users/info';

  private _loggedIn: boolean = false;

  constructor(private http: HttpClient, private saveUser: SaveUser) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          console.log('Token received:', response.token);
        }
      })
    );
  }

  register(user: UserModel): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/register`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._loggedIn = false;
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.usersUrl2}/users/get/all`).pipe(
      tap(
        data => console.log("Users fetched successfully:", data),
        error => console.error("Error fetching users:", error)
      )
    );
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.usersUrl2}/get/${id}`);
  }

  updateUser(id: number, user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.usersUrl2}/${id}`, user);
  }

  // getCurrentUser(): Observable<UserModel> {
  //   return this.http.get<UserModel>(`${this.usersUrl2}/me`);
  // }

  // getCurrentUserId(): Observable<number> {
  //   const headers = this.getHeaders();
  //   return this.http.get<number>(`${this.usersUrl}/me/id`, { headers })
  //     .pipe(catchError((error: any) => {
  //       console.error('Error fetching current user ID:', error);
  //       throw error;
  //     }));
  // }

  // getCurrentUserIdAddress(): Observable<number> {
  //   const headers = this.getHeaders();
  //   return this.http.get<number>(`${this.usersUrl}/me/id`, { headers })
  //     .pipe(catchError((error: any) => {
  //       console.error('Error fetching current user ID:', error);
  //       throw error;
  //     }));
  // }


  // getUserInfo(): Observable<any> {

  //   let headers = new HttpHeaders();

  //   if (this.saveUser.currentUserValue) {
  //     headers = new HttpHeaders({
  //       Authorization : `Bearer ${this.saveUser.currentUserValue!.token}`
  //     });
  //   }
  //   return this.http.get<any>(this.apiUrl, {headers : headers});
  // }

  getUserInfo(): Observable<any> {
    let headers = new HttpHeaders();
    if (this.saveUser.currentUserValue) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${this.saveUser.currentUserValue!.token}`
      });
    }
    return this.http.get<any>(this.apiUrl, {headers : headers})
      .pipe(
        tap(data => console.log('User info fetched:', data)),
        catchError(error => {
          console.error('Error fetching user info:', error);
          throw error;
        })
      );
  }

}









