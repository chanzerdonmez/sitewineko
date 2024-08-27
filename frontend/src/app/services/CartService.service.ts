import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { ArticleModel } from '../models/article.model';
import { tap } from 'rxjs';

const httpOptions = { 
  header: new HttpHeaders({ 'content-type': 'application/json',
  'Accept': 'text/html, application/xhtml+xml, */*', }),
  responseType: 'json' as 'json', withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/carts';
  private paymentItems: ArticleModel[] = [];  // Variable pour stocker les articles pour le paiement

  private cartItemCount = new BehaviorSubject<number>(0);  // BehaviorSubject pour le nombre d'articles dans le panier
  
  constructor(private http: HttpClient) {}

  
    setPaymentItems(items: ArticleModel[]): void {
      this.paymentItems = items;
    }
    
    getPaymentItems(): ArticleModel[] {
      return this.paymentItems;
    }
    

  createCart(userId: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}`, { userId }, httpOptions);
  }

  getCartById(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${cartId}`, httpOptions);
  }

  removeItemFromCart(cartId: number, articleId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/${cartId}/items/${articleId}`, httpOptions);
  }

  clearCart(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cartId}/items`, httpOptions);
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.baseUrl, httpOptions);
  }

  addItemToCart(cartId: number, articleId: number, quantity: number): Observable<Cart> {
    const payload = { articleId, quantity };
    return this.http.post<Cart>(`${this.baseUrl}/${cartId}/items`, payload, httpOptions).pipe(
      tap(() => this.updateCartItemCount())  // Mise à jour du compte d'articles après l'ajout
    );
  }
  

  getAll(): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>(this.baseUrl, httpOptions);
  }

  // getCurrentUserCart(): Observable<Cart> {
  //   return this.http.get<Cart>(`${this.baseUrl}/current`, httpOptions);
  // }
  
  getCurrentUserCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/my`, httpOptions);
  }

  updateCartItemCount(): void {
    this.getCurrentUserCart().subscribe(
      (cart) => {
        const itemCount = cart.cartLines
          ? cart.cartLines.reduce((total, line) => total + line.quantity, 0)
          : 0;
        this.cartItemCount.next(itemCount);  // Mise à jour du BehaviorSubject
      },
      (error) => {
        console.error('Error loading cart items: ', error);
        this.cartItemCount.next(0);  // En cas d'erreur, émettre 0
      }
    );
  }

  // Observable pour s'abonner au nombre d'articles dans le panier
  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }


  increaseQuantity(cartId: number, articleId: number): Observable<Cart> {
    return this.addItemToCart(cartId, articleId, 1);
  }

  decreaseQuantity(cartId: number, articleId: number): Observable<Cart> {
    return this.addItemToCart(cartId, articleId, -1);
  }

}
