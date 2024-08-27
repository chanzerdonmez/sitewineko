import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public formProfile!: FormGroup;
  public formEmail!: FormGroup;
  public formPassword!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.initializeFormControls();
    this.loadUserProfile();
  }

  private initializeFormControls(): void {
    this.formProfile = new FormGroup({
      name: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required])
    });

    this.formEmail = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.formPassword = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  private loadUserProfile(): void {
    this.userService.getUserInfo().subscribe(
      (userInfo) => {
        // Pré-remplir le formulaire avec les informations de l'utilisateur
        this.formProfile.patchValue({
          name: userInfo.name,
          firstName: userInfo.firstName,
          phone: userInfo.phone,
          birthdate: userInfo.birthdate
        });

        this.formEmail.patchValue({
          email: userInfo.email
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      }
    );
  }

  public submitProfileForm(): void {
    if (this.formProfile.valid) {
      // Logique pour mettre à jour le profil (nom, prénom, téléphone, date de naissance)
      console.log('Profil mis à jour:', this.formProfile.value);
      this.userService.updateUserProfile(this.formProfile.value).subscribe(response => {
        console.log('Profil mis à jour avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour du profil', error);
      });
    }
  }

  public submitEmailForm(): void {
    if (this.formEmail.valid) {
      const updateEmailDto = {
        newEmail: this.formEmail.get('email')?.value
      };
      console.log('Email mis à jour:', updateEmailDto);
      this.userService.updateUserEmail(updateEmailDto).subscribe(response => {
        console.log('Email mis à jour avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour de l\'email', error);
      });
    }
  }
  

  public submitPasswordForm(): void {
    if (this.formPassword.valid) {
      console.log('Mot de passe mis à jour:', this.formPassword.value);
      this.userService.updateUserPassword(this.formPassword.value).subscribe(response => {
        console.log('Mot de passe mis à jour avec succès');
      }, error => {
        console.error('Erreur lors de la mise à jour du mot de passe', error);
      });
    }
  }

  deleteAccount(): void {
    this.userService.deleteAccount().subscribe({
      next: (response) => {
        alert('Compte supprimé avec succès.');
        // Redirigez l'utilisateur après la suppression
        this.router.navigate(['/']); // Redirige vers la page d'accueil, par exemple
      },
      error: (error) => {
        alert('Erreur lors de la suppression du compte.');
        console.error('Erreur lors de la suppression du compte:', error);
      }
    });
  }


}
