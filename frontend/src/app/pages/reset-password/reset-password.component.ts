import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup): any {
    return form.get('newPassword')!.value === form.get('confirmNewPassword')!.value
      ? null : { 'mismatch': true };
  }

  submitForm(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')!.value;
      this.userService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          alert('Mot de passe réinitialisé avec succès.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erreur lors de la réinitialisation du mot de passe', error);
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      });
    }
  }
}
