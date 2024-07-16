import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ArticleService } from '../../services/ArticleService.service';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleModel } from '../../models/article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CardComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit {

  categoryTitle: string | null = null; // Initialisez categoryTitle avec null par défaut
  articles: ArticleModel[] = [];


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryTitle = params.get('categoryTitle');
      this.loadArticles();
    });
  }

  loadArticles(): void {
    if (this.categoryTitle === 'Tous les produits' || this.categoryTitle === null) { // Vérifiez aussi si categoryTitle est null
      this.articleService.getAll().subscribe(
        articles => this.articles = articles,
        error => console.error('Error fetching articles', error)
      );
    } else {
      this.articleService.getArticlesByCategory(this.categoryTitle!).subscribe( // Utilisez ! pour indiquer que categoryTitle ne sera pas null ici
        articles => this.articles = articles,
        error => console.error('Error fetching articles', error)
      );
    }
  }

}