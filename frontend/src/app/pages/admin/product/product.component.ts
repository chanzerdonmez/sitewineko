import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { ProductService } from '../../../services/product.service';
import { lastValueFrom } from 'rxjs';

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
  public marque!: FormControl;
  public titre!: FormControl;
  public description!: FormControl;
  public prix!: FormControl;

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.createFormControls()
    this.createFormModel()
  }

  createFormControls(){
    this.marque = new FormControl('', Validators.required)
    this.titre = new FormControl('', Validators.required)
    this.description = new FormControl('', Validators.required)
    this.prix = new FormControl('', Validators.required)
  }

  async submitForm() {
    if (this.formProduct.valid) {
      const formData = this.formProduct.getRawValue();
      try {
        const response = await lastValueFrom(this.productService.productCreatedOne(formData));
        console.log("Produit créé avec succès :", response);
      } catch (error) {
        console.error("Erreur lors de la création du produit :", error);
      }
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }


  createFormModel() {
    this.formProduct = new FormGroup ({
        marque : this.marque,
        titre : this.titre,
        description : this.description,
        prix : this.prix
    })
  }

}
