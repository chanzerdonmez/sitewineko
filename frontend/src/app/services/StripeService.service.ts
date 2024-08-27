import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }),
  responseType: 'json' as 'json',
  withCredentials: true  // Cela assure que les cookies sont envoyés avec la requête
};

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private baseUrl = 'http://localhost:8080/api/stripe'; // Assurez-vous que cela correspond à votre backend

  constructor(private http: HttpClient) { }

  createCheckoutSession(items: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-checkout-session`, { items }, httpOptions);
  }
}
