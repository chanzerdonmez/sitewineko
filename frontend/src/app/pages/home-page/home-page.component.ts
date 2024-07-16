import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/UserService.service';
import { UserDisplayerComponent } from '../../components/user-displayer/user-displayer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArticleModel } from '../../models/article.model';
import { ArticleComponent } from '../admin/article/article.component';
import { ArticleService } from '../../services/ArticleService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    UserDisplayerComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    RouterLink,
    CommonModule

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  public recentArticles: ArticleModel[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getRecentArticles().subscribe({
      next: (articles) => {
        this.recentArticles = articles;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des articles récents :", error);
      }
    });
  }
  

  // async vaChercherTousLesUsers(): Promise<void>{
  //   this.users = await this.userService.getUserAll()
  //   console.log(this.users)
  // }

  // async VaChercherUnSeulUser(id: string) {
  //   this.users = await this.userService.getUserOne(id)
  //   console.log(this.users)
  // }
}
