import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../components/header/header.component";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from "../../services/UserService.service";
import { SaveUser } from "../../services/SaveUser.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public email!: FormControl;
  public password!: FormControl;
  public isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private saveUser: SaveUser
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formLogin = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  submitLoginForm(): void {
    if (this.formLogin.valid) {
      const formData = this.formLogin.value;
      console.log("Données du formulaire à envoyer :", formData);
      this.userService.login(formData).subscribe({
        next: (response) => {
          this.formLogin.reset();
          this.saveUser.saveUser(response);
          this.router.navigate(["/dashboard"]);
        },
        error: (error) => {
          console.error("Erreur lors de la connexion :", error);
        },
      });
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }
}
