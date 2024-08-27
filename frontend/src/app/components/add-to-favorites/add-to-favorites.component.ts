import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-favorites',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.css'
})
export class AddToFavoritesComponent {
  @Input() article: any;  // Vous pouvez passer l'article comme input si nécessaire
  isFavorite = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Vous pouvez également émettre un événement ou appeler un service ici pour gérer la logique de la wishlist
  }
}

