import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ArticleModel } from "../models/article.model";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    private articlesUrl = 'http://localhost:8080/article/save'; // Utilisez la même URL que dans votre API Spring Boot

    constructor(private http: HttpClient) { }

    save(article: ArticleModel): Observable<ArticleModel> {
        return this.http.post<ArticleModel>(this.articlesUrl, article)
            .pipe(catchError((error: any) => {
                console.error('Une erreur s\'est produite lors de la sauvegarde de l\'article :', error);
                throw error;
            }));
    }
}
