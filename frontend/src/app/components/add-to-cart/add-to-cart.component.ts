import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService.service';
import { ArticleModel } from '../../models/article.model';
import { Cart } from '../../models/cart.model';
import { NotificationService } from '../../services/NotificationService.service';  
import { Router } from '@angular/router';
import { SaveUser } from '../../services/SaveUser.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() article!: ArticleModel;
  cartId!: number;
  isAuthenticated: boolean = false; // Variable pour vérifier l'authentification
  showAuthModal: boolean = false;  // Variable pour contrôler l'affichage de la modal

  constructor(
    private cartService: CartService, 
    private notificationService: NotificationService, 
    private router: Router,
    private saveUser: SaveUser // Injecter le service SaveUser
  ) {}

  ngOnInit(): void {
    this.checkAuthentication(); // Vérifier l'authentification lors de l'initialisation du composant
    if (this.isAuthenticated) {
      this.loadCart();  // Charger le panier si l'utilisateur est authentifié
    }
  }

  checkAuthentication(): void {
    // Vérifier si l'utilisateur est connecté
    this.isAuthenticated = !!this.saveUser.currentUserValue;
  }

  loadCart(): void {
    this.cartService.getCurrentUserCart().subscribe(
      (cart: Cart) => {
        this.cartId = cart.id;
      },
      (error) => {
        console.error('Erreur lors du chargement du panier', error);
        this.notificationService.showNotification('Erreur lors du chargement du panier', 'error');  
      }
    );
  }

  addToCart(): void {
    if (!this.isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, afficher la modal
      this.showAuthModal = true;
      return;
    }

    if (!this.cartId) {
      console.error('Erreur : Aucun ID de panier trouvé');
      this.notificationService.showNotification('Erreur : Aucun ID de panier trouvé', 'error');  
      return;
    }

    this.cartService.addItemToCart(this.cartId, this.article.id, 1).subscribe(
      (response: Cart) => {
        console.log('Article ajouté au panier', response);
        this.notificationService.showNotification('Article ajouté au panier avec succès !', 'success');  
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'article au panier', error);
        this.notificationService.showNotification('Erreur lors de l\'ajout de l\'article au panier', 'error');  
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/register']);
  }

  closeModal(): void {
    this.showAuthModal = false;
  }
}
