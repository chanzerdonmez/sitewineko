import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService.service';
import { ArticleModel } from '../../models/article.model';
import { Cart } from '../../models/cart.model';
import { NotificationService } from '../../services/NotificationService.service';  // Importer le service de notification
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [
    CommonModule, LoginModalComponent
  ],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() article!: ArticleModel;
  cartId!: number;


  constructor(private cartService: CartService, private notificationService: NotificationService) {}  // Injecter le service de notification

  ngOnInit(): void {
    this.loadCart();  // Charger le panier lors de l'initialisation du composant
  }

  loadCart(): void {
    this.cartService.getCurrentUserCart().subscribe(
      (cart: Cart) => {
        this.cartId = cart.id;
      },
      (error) => {
        console.error('Erreur lors du chargement du panier', error);
        this.notificationService.showNotification('Erreur lors du chargement du panier', 'error');  // Afficher une notification d'erreur
      }
    );
  }

  addToCart(): void {
    if (!this.cartId) {
      console.error('Erreur : Aucun ID de panier trouvé');
      this.notificationService.showNotification('Erreur : Aucun ID de panier trouvé', 'error');  // Afficher une notification d'erreur
      return;
    }

    this.cartService.addItemToCart(this.cartId, this.article.id, 1).subscribe(
      (response: Cart) => {
        console.log('Article ajouté au panier', response);
        this.notificationService.showNotification('Article ajouté au panier avec succès !', 'success');  // Afficher une notification de succès
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'article au panier', error);
        this.notificationService.showNotification('Erreur lors de l\'ajout de l\'article au panier', 'error');  // Afficher une notification d'erreur
      }
    );
  }
}
