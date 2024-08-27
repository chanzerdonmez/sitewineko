import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/NotificationService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
  <div *ngIf="notification" class="alert" [ngClass]="[getAlertClass(), fadeOutClass]" role="alert">
    {{ notification.message }}
  </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: { message: string; type: 'success' | 'error' | 'info' } | null = null;
  fadeOutClass: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notification => {
      this.notification = notification;
      this.fadeOutClass = ''; // Réinitialiser la classe

      // Lancer la disparition après 3 secondes
      setTimeout(() => {
        this.fadeOutClass = 'fade-out';
        setTimeout(() => this.notification = null, 500); // Attendre que l'animation se termine
      }, 3000);
    });
  }

  getAlertClass(): string {
    switch (this.notification?.type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-error';
      case 'info': return 'alert-info';
      default: return 'alert-info';
    }
  }
}
