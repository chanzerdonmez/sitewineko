import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../../services/ArticleService.service';
import { ArticleModel } from '../../models/article.model';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from '../../components/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    AddToCartComponent,
    RouterModule
  ],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  public article: ArticleModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const articleId = Number(params.get('id'));
      if (articleId) {
        this.articleService.getArticleById(articleId).subscribe(
          (article: ArticleModel) => {
            this.article = article;
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'article :', error);
          }
        );
      }
    });
  }

  shareArticle(): void {
    if (navigator.share && this.article) {
      navigator.share({
        title: this.article.title,
        text: this.article.description,
        url: window.location.href
      }).then(() => {
        console.log('Article partagé avec succès');
      }).catch((error) => {
        console.error('Erreur lors du partage de l\'article', error);
      });
    } else {
      console.error('Le partage n\'est pas pris en charge sur ce navigateur');
    }
  }
}
