import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//nom de domaine racine de l'api
const apiRoot = "https://jsonplaceholder.typicode.com"

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
export class ApiService 
{
    //cette classe ne renvoit que des observable suite a la communication avec le backend.

    constructor(
        private http: HttpClient
    ){}

    retrieveAllUsers(): Observable<any> {
        return this.http.get(`${apiRoot}/users`, HttpOptions)
    }

    retrieveOneUser(id: string): Observable<any> {
        return this.http.get(`${apiRoot}/users/${id}`, HttpOptions)
    }
}