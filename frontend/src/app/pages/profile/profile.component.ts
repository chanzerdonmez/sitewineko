import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public formProfile!: FormGroup;
  public name!: FormControl;
  public firstName!: FormControl;
  public phone!: FormControl;       // Ajout du contrôle phone
  public birthdate!: FormControl;  
  public email!: FormControl;
  public password!: FormControl;

  ngOnInit(): void {
    this.initializeFormControls();
    this.formProfile = new FormGroup({
      name: this.name,
      firstName: this.firstName,
      email: this.email,
      phone: this.phone,          // Ajout du contrôle phone au groupe
      birthdate: this.birthdate,  
      password: this.password
    });
  }

  private initializeFormControls(): void {
    this.name = new FormControl('', [Validators.required]);
    this.firstName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [Validators.required]);         // Initialisation du contrôle phone
    this.birthdate = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  }

  public submitProfileForm(): void {
    if (this.formProfile.valid) {
      // Handle form submission
      console.log('Form submitted:', this.formProfile.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
