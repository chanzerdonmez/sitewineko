import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryModel } from "../models/category.model";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private categoriesUrl = 'http://localhost:8080/api/category/save';
    private getCategoriesUrl = 'http://localhost:8080/api/category/get/all';
    private getCategoryUrl = 'http://localhost:8080/api/category/get';

    private apiUrl = 'http://localhost:8080/api/category'

    constructor(private http: HttpClient) { }

    save(category: CategoryModel): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(this.categoriesUrl, category)
            .pipe(
                catchError((error: any) => {
                    console.error('Une erreur s\'est produite lors de la sauvegarde de la catégorie :', error);
                    return throwError(() => error); // Utilisation de la nouvelle signature
                })
            );
    }

    getCategories(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(this.getCategoriesUrl)
            .pipe(
                tap((categories: CategoryModel[]) => {
                    console.log('Catégories récupérées avec succès :', categories);
                }),
                catchError((error) => {
                    console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
                    return throwError(() => error); // Utilisation de la nouvelle signature
                })
            );
    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.getCategoriesUrl)
          .pipe(
            catchError((error: any) => {
              console.error('Error fetching categories: ', error);
              throw error;
            })
          );
      }

      getCategoryById(id: number): Observable<CategoryModel> {
        const url = `${this.getCategoryUrl}/${id}`;
        return this.http.get<CategoryModel>(url);
      }


    update(id: number, updatedCategory: CategoryModel): Observable<CategoryModel> {
        const url = `${this.apiUrl}/update/${id}`;
        return this.http.patch<CategoryModel>(url, updatedCategory)
            .pipe(
                catchError((error: any) => {
                    console.error('Erreur lors de la mise à jour de la catégorie :', error);
                    return throwError(() => error);
                })
            );
    }
}
