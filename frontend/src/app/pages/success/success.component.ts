import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/OrderService.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/CartService.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit{

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private cartService: CartService  // Injecter le CartService
  ) {}

  ngOnInit(): void {
    this.orderService.finalizeOrder().subscribe(
      response => {
        console.log('Commande finalisée avec succès:', response);

        // Appeler la méthode pour vider le panier après la finalisation de la commande
        this.clearCartAfterSuccess();
      },
      error => {
        console.error('Erreur lors de la finalisation de la commande:', error);
      }
    );
  }

  private clearCartAfterSuccess(): void {
    this.cartService.getCurrentUserCart().subscribe(cart => {
      if (cart && cart.id) {
        this.cartService.clearCart(cart.id).subscribe(
          () => {
            console.log('Panier vidé après le paiement réussi.');
          },
          error => {
            console.error('Erreur lors du vidage du panier après le paiement', error);
          }
        );
      }
    });
  }
}
