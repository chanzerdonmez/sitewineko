import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { OrderService } from '../../services/OrderService.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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



  downloadInvoice(order: OrderModel): void {
    const doc = new jsPDF();
  
    // Ajouter un logo
    const logo = new Image();
    logo.src = 'assets/images/wineko6.png'; // Assurez-vous que le chemin est correct
    logo.onload = () => {
      const logoWidth = 50; // Largeur souhaitée
      const logoHeight = (logo.height / logo.width) * logoWidth; // Hauteur proportionnelle
  
      // Ajoutez l'image avec les dimensions calculées pour maintenir le ratio d'aspect
      doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);
  
      doc.setFontSize(18);
      doc.text('Facture', 70, 20);
  
      doc.setFontSize(12);
      doc.text(`Numéro de commande : ${order.numberOrder}`, 10, 40);
  
      const dateCreation = new Date(order.dateCreation);
      doc.text(`Date : ${dateCreation.toLocaleDateString()}`, 10, 50);
      doc.text(`Email utilisateur : ${order.userEmail}`, 10, 60);
  
      doc.text('Adresse de facturation :', 10, 70);
      doc.text(`${order.billingAddress.name} ${order.billingAddress.firstName}`, 10, 80);
      doc.text(`${order.billingAddress.streetNumber} ${order.billingAddress.streetName}`, 10, 90);
      doc.text(`${order.billingAddress.city}, ${order.billingAddress.zipCode}`, 10, 100);
  
      doc.text('Adresse de livraison :', 10, 110);
      doc.text(`${order.shippingAddress.name} ${order.shippingAddress.firstName}`, 10, 120);
      doc.text(`${order.shippingAddress.streetNumber} ${order.shippingAddress.streetName}`, 10, 130);
      doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.zipCode}`, 10, 140);
  
      // Ajouter les lignes de commande avec autoTable
      const orderLines = order.orderLines.map((line) => [
        line.productName,
        line.quantity,
        line.unitPrice.toFixed(2),
        (line.quantity * line.unitPrice).toFixed(2)
      ]);
  
      autoTable(doc, {
        head: [['Produit', 'Quantité', 'Prix Unitaire', 'Prix Total']],
        body: orderLines,
        startY: 150,
        theme: 'striped',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
      });
  
      const finalY = (doc as any).lastAutoTable.finalY;
  
      doc.text(`Prix total : ${order.totalPrice.toFixed(2)} €`, 10, finalY + 10);
  
      doc.save(`facture_${order.numberOrder}.pdf`);
    };
  }
}  