import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProfileComponent } from '../profile/profile.component';
import { AddressComponent } from '../address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MyOrdersComponent } from '../my-orders/my-orders.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    HeaderComponent,
    ProfileComponent,
    AddressComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MyOrdersComponent
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

}
