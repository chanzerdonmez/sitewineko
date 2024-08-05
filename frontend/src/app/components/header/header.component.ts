import { Component, OnInit, Pipe } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../../services/CategoryService.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/UserService.service';
import { SaveUser } from '../../services/SaveUser.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    RouterLink,
    ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean = false;

  categories: any[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private saveUser : SaveUser

  ) { }

  ngOnInit(): void {
    this.loadCategories();
    if(this.saveUser.currentUserValue != null){
      this.loggedIn = true;
    }
    console.log(this.loggedIn);
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories: ', error);
      }
    );
  }

  logout(): void {
    // this.userService.logout();
    this.router.navigate(['/login']);
  }

}


