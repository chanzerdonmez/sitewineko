import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/UserService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent implements OnInit {
  formForgotPassword!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.formForgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForgotPasswordForm(): void {
    if (this.formForgotPassword.valid) {
      this.userService.forgotPassword(this.formForgotPassword.value.email).subscribe({
        next: () => {
          alert('Un e-mail de réinitialisation du mot de passe a été envoyé.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation', error);
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      });
    }
  }
}