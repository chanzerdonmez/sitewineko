import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/UserService.service';
import { UserModel } from '../../models/user.model';
import { Role } from '../../models/role.enum';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, ReCaptchaV3Service } from "ng-recaptcha";
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RecaptchaV3Module,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcZsQgqAAAAAOqDZEK_qv73-3SbJ6xUan51MBs6' }
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formRegister!: FormGroup;
  public name!: FormControl;
  public firstName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmationMessage: string = ''; // Ajout du champ de message de confirmation


  constructor(
    private userService: UserService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createFormModel();
  }

  createFormControls(): void {
    this.name = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

  }

  createFormModel(): void {
    this.formRegister = new FormGroup({
      name: this.name,
      firstName: this.firstName,
      email: this.email,
      password: this.password,

    });
  }

  submitRegisterForm(): void {
    if (this.formRegister.valid) {
      this.recaptchaV3Service.execute('register').subscribe({
        next: (token) => {
          console.log('reCAPTCHA token:', token);
          
          const user = new UserModel(
            0,
            this.name.value,
            this.firstName.value,
            this.email.value,
            this.password.value,
            new Date(),
            Role.CLIENT,
            '',
            ''
          );

          this.userService.register(user).subscribe({
            next: (response) => {
              console.log('Inscription réussie:', response);
              this.confirmationMessage = 'Merci de vérifier votre boîte de réception pour confirmer votre adresse e-mail.'; // Définir le message de confirmation
            },
            error: (error) => {
              console.error("Erreur lors de l'inscription :", error);
            }
          });
        },
        error: (error) => {
          console.error("Erreur reCAPTCHA :", error);
        }
      });
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }
}
