import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddressModel } from "../models/address.model";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AddressService {
    private addressUrl = 'http://localhost:8080/api/address/add';
    private apiUrl = 'http://localhost:8080/api/address';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    }

    save(address: AddressModel): Observable<AddressModel> {
        const headers = this.getHeaders();

        return this.http.post<AddressModel>(this.addressUrl, address, { headers })
            .pipe(catchError((error: any) => {
                console.error('Une erreur s\'est produite lors de la sauvegarde de l\'adresse :', error);
                throw error;
            }));
    }

    update(id: number, updatedAddress: AddressModel): Observable<AddressModel> {
        const url = `${this.apiUrl}/update/${id}`;
        console.log('updating address...');
        console.log (updatedAddress);
        return this.http.patch<AddressModel>(url, updatedAddress)
          .pipe(
            catchError((error: any) => {
              console.error('Erreur lors de la mise à jour de l\'adresse :', error);
              throw error;
            })
          );
    }

    getAddressById(id: number): Observable<AddressModel> {
        const url = `${this.apiUrl}/get/${id}`;
        return this.http.get<AddressModel>(url)
            .pipe(
                catchError((error: any) => {
                    console.error(`Une erreur s'est produite lors de la récupération de l'article avec l'ID ${id} :`, error);
                    throw error;
                })
            );
    }

}