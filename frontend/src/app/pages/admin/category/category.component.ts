import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { CategoryService } from '../../../services/CategoryService.service';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    public formCategory!: FormGroup;
    public id!: FormControl;
    public title!: FormControl;
    public categories: CategoryModel[] = [];

    @Output() categoryCreated: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
      this.createFormControls();
      this.createFormModel();
      this.getCategory(); //

    }

    submitForm(): void {
      if (this.formCategory.valid) {
          const formData = this.formCategory.value;
          if (this.formCategory.value.id) {
              // Update the category if ID is present
              this.categoryService.update(this.formCategory.value.id, formData).subscribe(() => {
                  this.categoryCreated.emit();
                  this.formCategory.reset();
                  this.getCategory(); // Refresh the category list
              });
          } else {
              // Save the new category
              this.categoryService.save(formData).subscribe(() => {
                  this.categoryCreated.emit();
                  this.formCategory.reset();
                  this.getCategory(); // Refresh the category list
              });
          }
      } else {
          console.error("Le formulaire n'est pas valide.");
      }
  }
  


  getCategory(): void {
    this.categoryService.getCategories().subscribe(
      (articles: CategoryModel[]) => {
        this.categories = articles;
        console.log('Articles chargés dans le composant :', this.categories);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des articles :', error);
      }
    );
  }

    createFormControls(): void {
      this.id = new FormControl('');
      this.title = new FormControl('', Validators.required);
    }

    createFormModel(): void {
      this.formCategory = new FormGroup({
          id: this.id,
          title: this.title,
      });
  }



    updateCategory(id: number) {
      this.categoryService.getCategoryById(id).subscribe(
        (article: CategoryModel) => {
          // console.log("article à modifier");
          // console.log(article);
          this.formCategory.patchValue({
            id: article.id,
            title: article.title,
          });
          // console.log(this.formArticle);
        },
        (error) => {
          console.error('Error fetching article for update', error);
        }
      );
    }


}
