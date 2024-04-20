import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
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

  submitForm(){
    if (this.formProduct.valid){

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
