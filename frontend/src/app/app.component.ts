import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationService } from './services/NotificationService.service';
import { NotificationComponent } from "./components/notification/notification.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    NotificationComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  stripePromise = loadStripe('pk_test_51NBHfWHRXxl48zKyXEe5JEzGVeA5wAQolXG6w72dCXZxh4XaP811Bd65NFUTUyvTWbPI9FpK5n14RQuOsJZ8TKU300gUfYBdT6');

  constructor(){
    registerLocaleData(fr.default)
  }

}
