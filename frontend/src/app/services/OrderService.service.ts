import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderModel } from "../models/order.model";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    private apiUrl = 'http://localhost:8080/api/order/get/all';

    constructor(private http: HttpClient) { }

    getOrders(): Observable<OrderModel[]> {
        return this.http.get<OrderModel[]>(this.apiUrl);
      }
}

