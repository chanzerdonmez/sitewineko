import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { OrderService } from '../../../services/OrderService.service';
import { OrderModel } from '../../../models/order.model';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: OrderModel[] = [];

  public users: UserModel[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: OrderModel[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    );
  }
  
  
  updateOrder(id: number): void {
    // Ajoutez ici la logique pour mettre à jour une commande
  }

  // Ajoutez ici d'autres méthodes nécessaires pour les actions sur les commandes
}
