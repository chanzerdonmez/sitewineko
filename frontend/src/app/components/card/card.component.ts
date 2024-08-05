import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/CartService.service';
import { ArticleModel } from '../../models/article.model';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
 // @Input() article: any;  // Propriété d'entrée pour recevoir des données du composant parent

 @Input() article!: ArticleModel;  // Utiliser le type 'Article' au lieu de 'any'


  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.article.id).subscribe(
      response => {
        console.log('Réponse du serveur :', response);
        alert('Article ajouté au panier');
      },
      error => {
        console.error('Erreur lors de l\'ajout au panier', error);
      }
    );
  }


}
