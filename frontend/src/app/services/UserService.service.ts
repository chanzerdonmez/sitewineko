import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserModel } from "../models/user.model";
import { tap } from "rxjs";
import { catchError } from 'rxjs/operators';
import { SaveUser } from "./SaveUser.service";
import { UserDto } from "../dto/UserDto";

const httpOptions = { 
  header: new HttpHeaders({ 'content-type': 'application/json',
  'Accept': 'text/html, application/xhtml+xml, */*', }),
  responseType: 'json' as 'json', withCredentials: true
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'http://localhost:8080/api/open';
  private baseUrl = 'http://localhost:8080';
  private usersUrl2 = 'http://localhost:8080/api/users';
  private apiUrl = 'http://localhost:8080/api/users/info';
  private apiUrl4 = 'http://localhost:8080/api/users/me';
  private apiUrl5 = 'http://localhost:8080/api/users/admin'; // URL du nouveau endpoint



  private _loggedIn: boolean = false;


  constructor(private http: HttpClient, private saveUser: SaveUser) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(this.apiUrl4, { withCredentials: true });
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

  logout(): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/logout`, {} , { withCredentials: true })

 
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


  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/users/requestPasswordReset', { email });
  }


  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/users/resetPassword', { token, newPassword });
  }
  


  updateUserProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.usersUrl2}/updateProfile`, profileData, httpOptions)
      .pipe(
        tap(data => console.log('Profil mis à jour:', data)),
        catchError(error => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          throw error;
        })
      );
  }

  // Méthode pour mettre à jour l'email de l'utilisateur
  updateUserEmail(emailData: any): Observable<any> {
    return this.http.put(`${this.usersUrl2}/updateEmail`, emailData, httpOptions)
      .pipe(
        tap(data => console.log('Email mis à jour:', data)),
        catchError(error => {
          console.error('Erreur lors de la mise à jour de l\'email:', error);
          throw error;
        })
      );
  }

  // Méthode pour mettre à jour le mot de passe de l'utilisateur
  updateUserPassword(passwordData: any): Observable<any> {
    return this.http.put(`${this.usersUrl2}/updatePassword`, passwordData, httpOptions)
      .pipe(
        tap(data => console.log('Mot de passe mis à jour:', data)),
        catchError(error => {
          console.error('Erreur lors de la mise à jour du mot de passe:', error);
          throw error;
        })
      );
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.usersUrl2}/me`, { withCredentials: true }) // Assurez-vous que le backend accepte cette route
      .pipe(
        tap(response => console.log('Compte supprimé:', response)),
        catchError(error => {
          console.error('Erreur lors de la suppression du compte:', error);
          return throwError(() => error);
        })
      );
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl5}/${id}`);
  }

  
}










