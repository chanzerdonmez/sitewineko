import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  addToCart(articleId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/add/${articleId}`, {}, { responseType: 'text' })
      .pipe(
        catchError(this.handleError<string>('addToCart'))
      );
  }

  getCart(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Map<number, number>>('getCart', new Map()))
      );
  }

  removeFromCart(articleId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/remove/${articleId}`)
      .pipe(
        catchError(this.handleError<string>('removeFromCart'))
      );
  }

  clearCart(): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/clear`)
      .pipe(
        catchError(this.handleError<string>('clearCart'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Return an observable with a user-friendly error message or default result
      return of(result as T);
    };
  }
}
