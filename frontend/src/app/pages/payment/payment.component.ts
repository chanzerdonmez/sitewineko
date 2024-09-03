import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../services/StripeService.service';
import { ArticleModel } from '../../models/article.model';
import { CartService } from '../../services/CartService.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/OrderService.service';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/UserService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  step: number = 1;
  items: ArticleModel[] = [];
  total: number = 0;
  loading: boolean = false;
  error: string = '';
  user: UserModel = new UserModel(0, '', '', '', '', new Date(), '', '', ''); // Initialisation par défaut

  deliveryForm: FormGroup;
  billingForm: FormGroup;

  constructor(
    private stripeService: StripeService,
    private cartService: CartService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private userService: UserService
  ) { 
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.items = this.cartService.getPaymentItems();
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
    // Récupérer dynamiquement les informations de l'utilisateur
    this.userService.getUserInfo().subscribe(
      user => {
        this.user = user;
        // Préremplir les formulaires avec les informations utilisateur si disponibles
        this.deliveryForm.patchValue({
          name: user.name,
          firstName: user.firstName,
        });
        this.billingForm.patchValue({
          name: user.name,
          firstName: user.firstName,
        });
      },
      error => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    );
  }
  
  submitOrder(): void {
    const deliveryValues = this.deliveryForm.value;
    const billingValues = this.billingForm.value;
  
    const orderLines = this.items.map(item => ({
      productName: item.title,
      quantity: item.quantity,
      unitPrice: item.price,
    }));
  
    const orderData = {
      numberOrder: this.generateOrderNumber(),
      billingName: billingValues.name,
      billingFirstName: billingValues.firstName,
      billingStreetName: billingValues.streetName,
      billingStreetNumber: billingValues.streetNumber,
      billingCity: billingValues.city,
      billingZipCode: billingValues.zipCode,
      shippingName: deliveryValues.name,
      shippingFirstName: deliveryValues.firstName,
      shippingStreetName: deliveryValues.streetName,
      shippingStreetNumber: deliveryValues.streetNumber,
      shippingCity: deliveryValues.city,
      shippingZipCode: deliveryValues.zipCode,
      orderLines: orderLines,
      userId: this.user.id
    };
  
    this.orderService.initializeOrder(orderData).subscribe(
      response => {
        console.log('Commande initialisée avec succès:', response);
        this.initializeStripePayment(); // Redirige vers Stripe pour le paiement
      },
      error => {
        console.error('Erreur lors de l\'initialisation de la commande:', error);
      }
    );
  }

  initializeStripePayment(): void {
    this.loading = true;
    
    this.stripeService.createCheckoutSession(this.items).subscribe(
      (response: any) => {
        console.log('Session Stripe créée:', response);
        const stripe = (window as any).Stripe('pk_test_51NBHfWHRXxl48zKyXEe5JEzGVeA5wAQolXG6w72dCXZxh4XaP811Bd65NFUTUyvTWbPI9FpK5n14RQuOsJZ8TKU300gUfYBdT6');
        stripe.redirectToCheckout({ sessionId: response.sessionId });
      },
      error => {
        this.loading = false;
        this.error = 'Une erreur est survenue lors de la redirection vers Stripe. Veuillez réessayer.';
        console.error('Erreur lors de la création de la session Stripe:', error);
      }
    );
  }

  generateOrderNumber(): string {
    return 'ORD' + Math.floor(Math.random() * 1000000);
  }

  nextStep(): void {
    if (this.step === 1 && this.deliveryForm.valid) {
      this.step = 2;
    } else if (this.step === 2 && this.billingForm.valid) {
      this.submitOrder(); // Soumettre la commande et rediriger vers Stripe
    }
  }

  previousStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }
}
