import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact/send';

  constructor(private http: HttpClient) {}

  sendMessage(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact, { responseType: 'text' }); // Utilisation de responseType: 'text'
  }
}
