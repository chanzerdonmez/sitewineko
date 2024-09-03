import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CartService } from '../../services/CartService.service';
import { Cart } from '../../models/cart.model';
import { CartLine } from '../../models/cartLine.model';
import { ArticleService } from '../../services/ArticleService.service';
import { ArticleModel } from '../../models/article.model';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js'; // Correction ici
import { StripeService } from '../../services/StripeService.service'; // Correction ici
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/NotificationService.service';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart: Cart | null = null;
  articles: ArticleModel[] = [];
  totalPrice: number = 0;
  errorMessage: string = '';

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private card: StripeCardElement | null = null;

  constructor(
    private cartService: CartService,
    private articleService: ArticleService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserCart();
  }

  loadCurrentUserCart(): void {
    this.cartService.getCurrentUserCart().subscribe({
      next: (cartData) => {
        this.cart = cartData;
        this.calculateTotalPrice();
        this.loadArticles();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du panier : ' + error.message;
        console.error('Détails de l\'erreur:', error);
      }
    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe({
      next: (articles) => {
        if (this.cart) {
          this.articles = articles.filter(article =>
            this.cart!.cartLines.some(line => line.articleId === article.id)
          );
          this.calculateTotalPrice();
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    });
  }

  calculateTotalPrice(): void {
    if (this.cart) {
      this.totalPrice = this.cart.cartLines.reduce((total, line) => {
        const article = line.article;
        if (article && article.price) {
          return total + (article.price * line.quantity);
        }
        return total;
      }, 0);
    }
  }

  getArticleQuantity(articleId: number): number {
    const line = this.cart?.cartLines.find(line => line.articleId === articleId);
    return line ? line.quantity : 0;
  }

  removeFromCart(articleId: number): void {
    if (this.cart) {
      this.cartService.removeItemFromCart(this.cart.id, articleId).subscribe(
        (updatedCart) => {
          this.cart = updatedCart;
          this.loadArticles();
          this.notificationService.showNotification('Vous avez supprimé un article du panier.', 'success');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'article du panier', error);
          this.notificationService.showNotification('Erreur lors de la suppression de l\'article.', 'error');
        }
      );
    }
  }

  clearCart(): void {
    if (this.cart) {
      this.cartService.clearCart(this.cart.id).subscribe({
        next: () => {
          this.articles = [];
          this.totalPrice = 0;
          console.log('Panier vidé avec succès');
        },
        error: (error) => {
          console.error('Erreur lors du vidage du panier', error);
        }
      });
    }
  }

  addItemToCart(articleId: number, quantity: number): void {
    if (this.cart) {
      this.cartService.addItemToCart(this.cart.id, articleId, quantity).subscribe({
        next: (updatedCart) => {
          this.cart = updatedCart;
          this.loadArticles();
          console.log('Article ajouté au panier');
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'article au panier', error);
        }
      });
    } else {
      console.error('Erreur : Aucun ID de panier trouvé');
    }
  }

  proceedToCheckout(): void {
    if (this.cart) {
      const paymentItems: ArticleModel[] = this.cart.cartLines.map(line => {
        const article = line.article;
        return {
          id: article.id,
          title: article.title,
          price: article.price,
          quantity: line.quantity,
          brand: (article as any).brand || 'Default Brand',
          description: (article as any).description || 'No description available',
          image: (article as any).image || null,
          dateCreation: (article as any).dateCreation || new Date(),
          active: (article as any).active !== undefined ? (article as any).active : true,
          category: (article as any).category || null
        };
      });

      this.cartService.setPaymentItems(paymentItems);
      this.router.navigate(['/payment']);
    }
  }

  increaseQuantity(articleId: number): void {
    if (this.cart) {
      this.cartService.addItemToCart(this.cart.id, articleId, 1).subscribe(
        (updatedCart: Cart) => {
          this.cart = updatedCart;
          this.calculateTotalPrice();
        },
        (error: any) => {
          console.error('Erreur lors de l\'augmentation de la quantité', error);
        }
      );
    }
  }

  decreaseQuantity(articleId: number): void {
    if (this.cart) {
        const line = this.cart.cartLines.find(line => line.articleId === articleId);
        if (line) {
            if (line.quantity > 1) {
                // Réduire la quantité de 1
                this.cartService.addItemToCart(this.cart.id, articleId, -1).subscribe(
                    (updatedCart: Cart) => {
                        this.cart = updatedCart;
                        this.calculateTotalPrice();
                    },
                    (error: any) => {
                        console.error('Erreur lors de la réduction de la quantité', error);
                    }
                );
            } else {
                // Si la quantité est 1, retirer l'article du panier
                this.removeFromCart(articleId);
            }
        }
    }
}


  
  
}