import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/ArticleService.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    HeaderComponent,
    CardComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }
}
