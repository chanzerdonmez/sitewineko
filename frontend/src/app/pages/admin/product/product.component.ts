import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { ProductService } from '../../../services/product.service';
import { lastValueFrom } from 'rxjs';
import { ProductModel } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public formProduct!: FormGroup;
  public brand!: FormControl;
  public title!: FormControl;
  public description!: FormControl;
  public price!: FormControl;

  @Output() productCreated: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.createFormControls();
    this.createFormModel();
  }

  createFormControls(): void {
    this.brand = new FormControl('', Validators.required);
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
  }

  submitForm(): void {
    if (this.formProduct.valid) {
      const formData = this.formProduct.value;
      console.log('Données du formulaire à envoyer :', formData);
      this.productService.productCreatedOne(formData).subscribe(() => {
        this.productCreated.emit();
        this.formProduct.reset();
      });
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }

  createFormModel(): void {
    this.formProduct = new FormGroup ({
        brand : this.brand,
        title : this.title,
        description : this.description,
        price : this.price
    });
  }
}
