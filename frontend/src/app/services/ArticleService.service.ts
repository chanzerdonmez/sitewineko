import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleModel } from "../models/article.model";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

const httpOptions = { 
    header: new HttpHeaders({ 'content-type': 'application/json',
    'Accept': 'text/html, application/xhtml+xml, */*', }),
    responseType: 'json' as 'json', withCredentials: true
}

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    private articlesUrl = 'http://localhost:8080/api/article/save';
    private getArticlesUrl = 'http://localhost:8080/api/article/get/all';
    private deepDeleteArticleUrl = 'http://localhost:8080/api/article/delete/deep';
    private apiUrl = 'http://localhost:8080/api/article';
    private deleteArticleUrl = 'http://localhost:8080/api/article/delete';
    private getRecentArticlesUrl = 'http://localhost:8080/api/article/get/recent'; // Ajoutez cette ligne

    private updateArticleUrl = 'http://localhost:8080/api/article/get'


    constructor(private http: HttpClient) { }

    save(article: ArticleModel): Observable<ArticleModel> {
        return this.http.post<ArticleModel>(this.articlesUrl, article)
            .pipe(catchError((error: any) => {
                console.error('Une erreur s\'est produite lors de la sauvegarde de l\'article :', error);
                throw error;
            }));
    }

    getAll(): Observable<ArticleModel[]> {
        const headers = new HttpHeaders({
            // Authorization: `Bearer ${this.authService.currentUserValue?.token}`
        });
      
        return this.http.get<ArticleModel[]>(this.getArticlesUrl, { headers })
            .pipe(catchError((error: any) => {
                console.error('Une erreur s\'est produite lors de la récupération des articles :', error);
                throw error;
            }));
    }

    getArticlesByCategory(categoryTitle: string): Observable<ArticleModel[]> {
        const url = `http://localhost:8080/api/article/get/category/${categoryTitle}`;
        return this.http.get<ArticleModel[]>(url)
            .pipe(
                catchError((error: any) => {
                    console.error(`An error occurred while retrieving articles for category ${categoryTitle}:`, error);
                    throw error;
                })
            );
    }

    getRecentArticles(): Observable<ArticleModel[]> { // Ajoutez cette méthode
        return this.http.get<ArticleModel[]>(this.getRecentArticlesUrl)
            .pipe(catchError((error: any) => {
                console.error('Une erreur s\'est produite lors de la récupération des articles récents :', error);
                throw error;
            }));
    }

    deepDeleteArticle(id: number): Observable<any> {
        const url = `${this.deepDeleteArticleUrl}/${id}`;
        return this.http.delete(url, { responseType: 'text' }).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error deleting article:', error);
                return of(error);
            })
        );
    }


    deleteArticle(id: number): Observable<any> {
        const url = `${this.deleteArticleUrl}/${id}`;
        return this.http.delete(url, { responseType: 'text' }).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error deleting article:', error);
                return of(error);
            })
        );
    }


    update(id: number, updatedArticle: ArticleModel): Observable<ArticleModel> {
        const url = `${this.apiUrl}/update/${id}`;
        console.log('updating article...');
        console.log (updatedArticle);
        return this.http.patch<ArticleModel>(url, updatedArticle)
          .pipe(
            catchError((error: any) => {
              console.error('Erreur lors de la mise à jour de l\'article :', error);
              throw error;
            })
          );
    }
    
    getArticleById(id: number): Observable<ArticleModel> {
        const url = `${this.apiUrl}/get/${id}`;
        return this.http.get<ArticleModel>(url)
            .pipe(
                catchError((error: any) => {
                    console.error(`Une erreur s'est produite lors de la récupération de l'article avec l'ID ${id} :`, error);
                    throw error;
                })
            );
    }


    // uploadImage(id: number, formData: FormData): Observable<any> {
    //     const url = `${this.apiUrl}/upload/${id}`;
    //     return this.http.post(url, formData)
    //         .pipe(catchError((error: any) => {
    //             console.error('Une erreur s\'est produite lors du téléchargement de l\'image :', error);
    //             throw error;
    //         }));
    // }

    uploadImage(id: number, formData: FormData): Observable<any> {
        const url = `${this.apiUrl}/upload/${id}`;
        return this.http.post(url, formData, { responseType: 'text' })
            .pipe(catchError((error: any) => {
                console.error('Une erreur s\'est produite lors du téléchargement de l\'image :', error);
                throw error;
            }));
    }
    

    getImageUrl(filename: string): string {
        return `${this.apiUrl}/image/${filename}`;
      }
}
