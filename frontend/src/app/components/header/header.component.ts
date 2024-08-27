import { Component, OnInit, Pipe } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../../services/CategoryService.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/UserService.service';
import { SaveUser } from '../../services/SaveUser.service';
import { CartService } from '../../services/CartService.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    RouterLink
    ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean = false;
  public cartItemCount: number = 0;  // Variable pour stocker le nombre d'articles dans le panier


  categories: any[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private saveUser : SaveUser,
    private userService : UserService,
    private cartService: CartService



  ) { }

  ngOnInit(): void {
    this.loadCategories();
    if (this.saveUser.currentUserValue != null) {
      this.loggedIn = true;
    }
    
    // S'abonner aux changements du nombre d'articles dans le panier
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

    // Initialiser le compte du panier au démarrage
    this.cartService.updateCartItemCount();


    
  }

  


  loadCategories(): void {
    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories: ', error);
      }
    );
  }



   logout(): void {
    this.userService.logout().subscribe({
      next: (response) => {
          console.log(response)
      },
      error: (error) => {
        console.error("Erreur lors de la connexion :", error);
      },
    });
    this.router.navigate(['/login']);
  }


  getCartItemCount(): void {
    this.cartService.getCurrentUserCart().subscribe(
      (cart) => {
        this.cartItemCount = cart.cartLines
          ? cart.cartLines.reduce((total, line) => total + line.quantity, 0)
          : 0;
      },
      (error) => {
        console.error('Error loading cart items: ', error);
        this.cartItemCount = 0; // En cas d'erreur, afficher 0
      }
    );
  }
  
  

}


