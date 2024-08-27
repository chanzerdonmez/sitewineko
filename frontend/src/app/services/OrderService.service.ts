import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { OrderModel } from "../models/order.model";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

const httpOptions = { 
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/html, application/xhtml+xml, */*'
    }),
    withCredentials: true
};

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiUrl = 'http://localhost:8080/api/order';

    constructor(private http: HttpClient) {}

    initializeOrder(orderData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/initialize`, orderData, httpOptions)
          .pipe(
            catchError(this.handleError<any>('initializeOrder'))
          );
      }

      finalizeOrder(): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/finalize`, {}, httpOptions)
          .pipe(
            catchError(this.handleError<any>('finalizeOrder'))
          );
      }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }

      getOrders(): Observable<OrderModel[]> {
        return this.http.get<OrderModel[]>(`${this.apiUrl}/get/all`, httpOptions)
          .pipe(
            catchError(this.handleError<OrderModel[]>('getOrders', []))
          );
      }

      getUserOrders(): Observable<OrderModel[]> {
        return this.http.get<OrderModel[]>(`${this.apiUrl}/get/user-orders`, httpOptions);
      }

}
