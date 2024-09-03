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
  public loading: boolean = false;  // Pour l'état de chargement
  public successMessage: string = '';  // Pour les messages de succès
  public errorMessage: string = '';  // Pour les messages d'erreur

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
    this.loading = true;
    this.userService.getUserInfo().subscribe(
      (userInfo) => {
        this.loading = false;
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
        this.loading = false;
        this.errorMessage = 'Erreur lors de la récupération des informations de l\'utilisateur';
        console.error(this.errorMessage, error);
      }
    );
  }

  public submitProfileForm(): void {
    if (this.formProfile.valid) {
      this.loading = true;
      this.userService.updateUserProfile(this.formProfile.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Profil mis à jour avec succès';
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la mise à jour du profil';
          console.error(this.errorMessage, error);
        }
      });
    }
  }

  public submitEmailForm(): void {
    if (this.formEmail.valid) {
      this.loading = true;
      const updateEmailDto = {
        newEmail: this.formEmail.get('email')?.value
      };
      this.userService.updateUserEmail(updateEmailDto).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Email mis à jour avec succès';
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la mise à jour de l\'email';
          console.error(this.errorMessage, error);
        }
      });
    }
  }

  public submitPasswordForm(): void {
    if (this.formPassword.valid) {
      this.loading = true;
      this.userService.updateUserPassword(this.formPassword.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Mot de passe mis à jour avec succès';
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la mise à jour du mot de passe';
          console.error(this.errorMessage, error);
        }
      });
    }
  }

  deleteAccount(): void {
    this.loading = true;
    this.userService.deleteAccount().subscribe({
      next: (response) => {
        this.loading = false;
        alert('Compte supprimé avec succès.');
        this.router.navigate(['/']); 
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la suppression du compte.';
        console.error(this.errorMessage, error);
      }
    });
  }

}
