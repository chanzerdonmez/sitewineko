import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CartService } from '../../services/CartService.service';
import { ArticleService } from '../../services/ArticleService.service';
import { ArticleModel } from '../../models/article.model';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Map<number, number> = new Map(); // Utiliser Map
  articles: ArticleModel[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      (cartData) => {
        console.log('Données du panier récupérées :', cartData);
        this.cartItems = new Map(Object.entries(cartData).map(([key, value]) => [Number(key), value]));
        console.log('Articles du panier après conversion :', this.cartItems);
        this.loadArticles();
      },
      (error) => {
        console.error('Erreur lors du chargement du panier', error);
      }
    );
}


loadArticles(): void {
  this.articleService.getAll().subscribe(
    (articles) => {
      console.log('Tous les articles disponibles :', articles);
      this.articles = articles.filter(article => this.cartItems.has(article.id));
      console.log('Articles filtrés pour le panier :', this.articles);
      this.calculateTotalPrice();
    },
    (error) => {
      console.error('Erreur lors de la récupération des articles', error);
    }
  );
}

  calculateTotalPrice(): void {
    this.totalPrice = this.articles.reduce((total, article) => {
      return total + (article.price * (this.cartItems.get(article.id) || 0));
    }, 0);
  }

  removeFromCart(articleId: number): void {
    this.cartService.removeFromCart(articleId).subscribe(
      (response) => {
        console.log(response);
        this.loadCart();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'article du panier', error);
      }
    );
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(
      (response) => {
        console.log(response);
        this.loadCart();
      },
      (error) => {
        console.error('Erreur lors du vidage du panier', error);
      }
    );
  }
}