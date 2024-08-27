import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/CartService.service';
import { ArticleModel } from '../../models/article.model';
import { Cart } from '../../models/cart.model';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { AddToFavoritesComponent } from '../add-to-favorites/add-to-favorites.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AddToCartComponent,
    AddToFavoritesComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() article!: ArticleModel;  // Utiliser le type 'Article' au lieu de 'any'

  cartId!: number;  // Ajouter une variable pour stocker le cartId

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();  // Charger le panier au moment de l'initialisation du composant
  }

  loadCart(): void {
    this.cartService.getCurrentUserCart().subscribe(
      (cart: Cart) => {
        this.cartId = cart.id;
      },
      (error) => {
        console.error('Erreur lors du chargement du panier', error);
      }
    );
  }

  addToCart(): void {
    if (!this.cartId) {
      console.error('Erreur : Aucun ID de panier trouvé');
      return;
    }

    this.cartService.addItemToCart(this.cartId, this.article.id, 1).subscribe(
      (response: Cart) => {
        console.log('Article ajouté au panier', response);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'article au panier', error);
      }
    );
  }
}
