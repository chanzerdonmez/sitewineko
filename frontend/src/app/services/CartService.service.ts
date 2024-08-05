import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

// cart.service.ts
addToCart(articleId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/add/${articleId}`, {}, { responseType: 'text' });
  }
  

  getCart(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(this.baseUrl);
  }

  removeFromCart(articleId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/remove/${articleId}`);
  }

  clearCart(): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/clear`);
  }
}
