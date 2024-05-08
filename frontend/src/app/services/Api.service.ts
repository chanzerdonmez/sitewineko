import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//nom de domaine racine de l'api
const apiRoot = "http://localhost8080/"

//options pour la communication Http
const HttpOptions = {
    header: new HttpHeaders ({
        'content-type': 'application/json',
        'Accept': 'text/html, application/xhtml+xml, */*',
    }),

    responseType: 'json' as 'json'
}

@Injectable({
    providedIn: 'root',
})
export class Api
{
    //cette classe ne renvoit que des observable suite a la communication avec le backend.

    constructor(
        private http: HttpClient
    ){}

    productRetrieveAll(): Observable<any> {
        return this.http.get(`${apiRoot}product/all`, HttpOptions)
    }

    productRetrieveOne(id: string): Observable<any> {
        return this.http.get(`${apiRoot}product/${id}`, HttpOptions)
    }

    productCreatedOne(productData: any): Observable<any> {
        return this.http.post(`${apiRoot}product`, productData, HttpOptions);
    }

    // productCreatedOne(formatData)
}