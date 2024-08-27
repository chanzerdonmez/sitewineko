import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { ArticleService } from '../../../services/ArticleService.service';
import { ArticleModel } from '../../../models/article.model';
import { CategoryService } from '../../../services/CategoryService.service';
import { CategoryModel } from '../../../models/category.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    RouterLinkActive,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public formArticle!: FormGroup;
  public id!: FormControl;
  public brand!: FormControl;
  public title!: FormControl;
  public description!: FormControl;
  public price!: FormControl;
  public category!: FormControl;
  public articles: ArticleModel[] = [];
  public categories: CategoryModel[] = [];
  private selectedFile!: File;


 // public currentPage: number = 1; // Page courante
 // public itemsPerPage: number = 10; // Nombre d'articles par page
 // public totalItems: number = 0; // Nombre total d'articles (pour la pagination)

  @Output() articleCreated: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>();
  @Output() articleDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private articleService: ArticleService, private categoryService: CategoryService, private router: Router) { } // Injecter Router


  ngOnInit(): void {
    this.createFormControls();
    this.createFormModel();
    this.loadCategories();
    this.loadArticles();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitForm(): void {
    if (this.formArticle.valid) {
      const formData = this.formArticle.value as ArticleModel;
      const selectedCategoryId = Number(formData.category);
      formData.category = this.categories.find(cat => cat.id === selectedCategoryId) || null;
      
      if (formData.category) {
        if (formData.id) {
          // Mise à jour de l'article existant
          this.articleService.update(formData.id, formData).subscribe(
            (updatedArticle) => {
              console.log('Article mis à jour avec succès :', updatedArticle);
              if (this.selectedFile) {
                this.uploadImage(formData.id);
              }
              this.formArticle.reset();
              this.loadArticles();
            },
            (error) => {
              console.error('Erreur lors de la mise à jour de l\'article :', error);
            }
          );
        } else {
          // Ajout de la date de création pour un nouvel article
          formData.dateCreation = new Date();
          this.articleService.save(formData).subscribe(
            (savedArticle) => {
              console.log('Article sauvegardé avec succès :', savedArticle);
              if (this.selectedFile) {
                this.uploadImage(savedArticle.id);
              }
              this.formArticle.reset();
              this.loadArticles();
            },
            (error) => {
              console.error('Erreur lors de la sauvegarde de l\'article :', error);
            }
          );
        }
      } else {
        console.error('La catégorie sélectionnée n\'existe pas.');
      }
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  }
  
  
  

  createFormControls(): void {
    this.id = new FormControl('');
    this.brand = new FormControl('', Validators.required);
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
    this.category = new FormControl('', Validators.required);

    
  }


  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: CategoryModel[]) => {
        this.categories = categories;
        console.log('Catégories chargées dans le composant :', this.categories);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des catégories :', error);
      }
    );
  }
  
  deepDeleteArticle(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        this.articleService.deepDeleteArticle(id).subscribe(
            (response) => {
                if (response instanceof HttpErrorResponse) {
                    console.error('Error deleting article:', response.error);
                } else {
                    console.log('Article deleted successfully');
                    this.articles = this.articles.filter(article => article.id !== id);
                    this.articleDeleted.emit(id);
                }
            },
            (error) => {
                console.error('Unexpected error:', error);
            }
        );
    }
}

updateArticle(id: number) {
  this.articleService.getArticleById(id).subscribe(
    (article: ArticleModel) => {
      // console.log("article à modifier");
      // console.log(article);
      this.formArticle.patchValue({
        id: article.id,
        brand: article.brand,
        title: article.title,
        description: article.description,
        price: article.price,
        category: article.category ? article.category.id : null
      });
      // console.log(this.formArticle);
    },
    (error) => {
      console.error('Error fetching article for update', error);
    }
  );
}



  // loadArticles(): void {
  //   this.articleService.getAll().subscribe(
  //     (articles: ArticleModel[]) => {
  //       this.articles = articles;
  //       console.log('Articles chargés dans le composant :', this.articles);
  //     },
  //     (error) => {
  //       console.error('Une erreur s\'est produite lors du chargement des articles :', error);
  //     }
  //   );
  // }

  createFormModel(): void {
    this.formArticle = new FormGroup ({
        id : this.id,
        brand : this.brand,
        title : this.title,
        description : this.description,
        price : this.price,
        category: this.category // Ajoutez ce contrôle au modèle de formulaire

    });
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe(
      (articles: ArticleModel[]) => {
        this.articles = articles;
//        this.totalItems = this.articles.length;
        console.log('Articles chargés dans le composant :', this.articles);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des articles :', error);
      }
    );
  }

  getByIdArticle(id: number) {
    this.router.navigate(['/article', id]);
  }

// get paginatedArticles(): ArticleModel[] {
//   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//   return this.articles.slice(startIndex, startIndex + this.itemsPerPage);
// }

// getPageNumbers(): number[] {
//   return Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
// }

// getTotalPages(): number {
//   return Math.ceil(this.totalItems / this.itemsPerPage);
// }

// onPageChange(pageNumber: number): void {
//   this.currentPage = pageNumber;
// }



private uploadImage(articleId: number): void {
  const formData = new FormData();
  formData.append('image', this.selectedFile, this.selectedFile.name);
  this.articleService.uploadImage(articleId, formData).subscribe(
    (response) => {
      console.log('Image uploaded successfully:', response);
      this.loadArticles();
    },
    (error) => {
      console.error('Error uploading image:', error);
    }
  );
}

}
