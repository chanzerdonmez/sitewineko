import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CardComponent } from '../../card/card.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    HeaderComponent,
    CardComponent,
    FooterComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
