import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  loggedIn$ = this.loggedInSubject.asObservable();

  private hasToken(): boolean {
    return document.cookie.includes('token');
  }

  setLoggedIn(loggedIn: boolean): void {
    this.loggedInSubject.next(loggedIn);
  }
}
