import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/ArticleService.service';
import { ArticleModel } from '../../models/article.model';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule
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
}
