import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressModel } from '../../models/address.model';
import { AddressService } from '../../services/AddressService.service';
import { UserService } from '../../services/UserService.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public formAddress!: FormGroup;
  public city!: FormControl;
  public streetName!: FormControl;
  public streetNumber!: FormControl;
  public zipCode!: FormControl;
  private currentUserId: number | null = null;

  constructor(private addressService: AddressService, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeFormControls();
    this.formAddress = new FormGroup({
      city: this.city,
      streetName: this.streetName,
      streetNumber: this.streetNumber,
      zipCode: this.zipCode,
    });

    this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUserId = user.id;
        console.log('Current user ID:', this.currentUserId);
      },
      error => {
        console.error("Error fetching current user:", error);
      }
    );
  }

  initializeFormControls(): void {
    this.city = new FormControl('', Validators.required);
    this.streetName = new FormControl('', Validators.required);
    this.streetNumber = new FormControl('', Validators.required);
    this.zipCode = new FormControl('', Validators.required);
  }

  submitForm(): void {
    if (this.formAddress.valid && this.currentUserId !== null) {
      const formData = this.formAddress.value as AddressModel;
      formData.userId = this.currentUserId;

      if (formData.id) {
        this.addressService.update(formData.id, formData).subscribe(
          (updatedAddress) => {
            console.log('Adresse mise à jour avec succès :', updatedAddress);
            this.formAddress.reset();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'adresse :', error);
          }
        );
      } else {
        this.addressService.save(formData).subscribe(
          (savedAddress) => {
            console.log('Adresse sauvegardée avec succès :', savedAddress);
            this.formAddress.reset();
          },
          (error) => {
            console.error('Erreur lors de la sauvegarde de l\'adresse :', error);
          }
        );
      }
    } else {
      console.error('Le formulaire n\'est pas valide ou l\'ID utilisateur est manquant.');
    }
  }
}
