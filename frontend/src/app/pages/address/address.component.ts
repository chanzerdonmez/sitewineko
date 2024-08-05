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
    HeaderComponent
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
  public userId!: FormControl;
  public addresses: AddressModel[] = []; // Declare the addresses property


  constructor(private addressService: AddressService, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeFormControls();
    this.formAddress = new FormGroup({
      city: this.city,
      streetName: this.streetName,
      streetNumber: this.streetNumber,
      zipCode: this.zipCode,
      userId: this.userId
    });

    this.setUserId();
    this.loadUserAddresses();

  }

  initializeFormControls(): void {
    this.city = new FormControl('', Validators.required);
    this.streetName = new FormControl('', Validators.required);
    this.streetNumber = new FormControl('', Validators.required);
    this.zipCode = new FormControl('', Validators.required);
    this.userId = new FormControl('', Validators.required);
  }

  setUserId(): void {
    this.userService.getUserInfo().subscribe(
      data => {
        if (data && data.id) {
          this.userId.setValue(data.id);
        }
      },
      error => {
        console.error('Error fetching user info', error);
      }
    );
  }

  loadUserAddresses(): void {
    this.addressService.getUserAddresses().subscribe(
      addresses => {
        this.addresses = addresses;
      },
      error => {
        console.error('Error fetching user addresses', error);
      }
    );
  }


  submitForm(): void {
    if (this.formAddress.valid) {
      const formData = this.formAddress.value;

      this.addressService.save(formData).subscribe(
        (savedAddress) => {
          console.log('Address saved successfully:', savedAddress);
          this.formAddress.reset();
          this.loadUserAddresses(); // Recharger les adresses après en avoir ajouté une nouvelle
        },
        (error) => {
          console.error('Error saving address:', error);
        }
      );
    } else {
      console.log('City valid:', this.city.valid);
      console.log('Street name valid:', this.streetName.valid);
      console.log('Street number valid:', this.streetNumber.valid);
      console.log('Zip code valid:', this.zipCode.valid);
      console.log('User ID:', this.userId.value);
      console.error('Form is not valid.');
    }
  }




}
