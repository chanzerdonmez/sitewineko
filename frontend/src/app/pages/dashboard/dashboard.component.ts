import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductAdminComponent } from '../../components/product-admin/product-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductAdminComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
