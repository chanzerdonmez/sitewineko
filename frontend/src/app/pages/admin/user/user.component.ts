import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/UserService.service';
import { UserModel } from '../../../models/user.model';
import { Role } from '../../../models/role.enum';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  public formUser!: FormGroup;
  public name!: FormControl;
  public firstName!: FormControl;
  public email!: FormControl;
  public role!: FormControl;
  public password!: FormControl;
  public users: UserModel[] = [];
  public selectedUser: UserModel | null = null;
  public roles = Object.values(Role);

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createFormModel();
    this.loadUsers();
  }

  createFormControls(): void {
    this.name = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.role = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  createFormModel(): void {
    this.formUser = new FormGroup({
      name: this.name,
      firstName: this.firstName,
      email: this.email,
      role: this.role,
      password: this.password,
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (data: UserModel[]) => {
        console.log("Users fetched successfully:", data);
        this.users = data;
      },
      error => {
        console.error("Error fetching users:", error);
        if (error.error && error.error.detail) {
          console.error("Error detail:", error.error.detail);
        }
      }
    );
  }

  selectUser(userId: number): void {
    this.usersService.getUserById(userId).subscribe(
      user => {
        this.selectedUser = user;
        this.formUser.patchValue({
          name: user.name,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
          password: user.password, // Assurez-vous que ce champ est renvoyé par l'API
        });
      },
      error => {
        console.error("Error fetching user by ID:", error);
      }
    );
  }

  submitForm(): void {
    if (this.formUser.valid) {
      const formData = this.formUser.value as UserModel;
      if (this.selectedUser) {
        this.usersService.updateUser(this.selectedUser.id, formData).subscribe(
          response => {
            console.log("User updated successfully:", response);
            this.formUser.reset();
            this.selectedUser = null;
            this.loadUsers(); // Recharger la liste après modification d'un utilisateur
          },
          error => {
            console.error("Error updating user:", error);
          }
        );
      } else {
        this.usersService.register(formData).subscribe(
          response => {
            console.log("User registered successfully:", response);
            this.formUser.reset();
            this.loadUsers(); // Recharger la liste après ajout d'un utilisateur
          },
          error => {
            console.error("Error registering user:", error);
          }
        );
      }
    } else {
      console.error("Le formulaire n'est pas valide.");
    }
  }
}