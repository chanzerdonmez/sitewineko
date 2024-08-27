// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { UserService } from './UserService.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebServiceRequestService {

//   constructor(private httpClient: HttpClient, private userService: UserService) { }

//   request(target: string, data?: any): Observable<any> {
//     let headers = new HttpHeaders();

//     if (this.userService.getUserInfo) {
//       headers = new HttpHeaders({
//         Authorization: `Bearer ${this.userService.getUserInfo!.token}`
//       });
//     }

//     const req = {
//       target: target,
//       data: data
//     };

//     return this.httpClient.post<any>(`${environment.apiUrl}/api`, req, { headers: headers })
//       .pipe(
//         catchError(this.handleError.bind(this))
//       );
//   }

//   private handleError(error: any) {
//     console.error('An error occurred', error);
//     return throwError(error);
//   }
// }
