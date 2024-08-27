import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/OrderService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{

  orders: OrderModel[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    );
  }

  viewOrder(orderId: number): void {
    // Logique pour voir les détails de la commande
  }
}