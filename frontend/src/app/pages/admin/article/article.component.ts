import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { ArticleService } from '../../../services/ArticleService.service';
import { lastValueFrom } from 'rxjs';
import { ArticleModel } from '../../../models/article.model';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public formArticle!: FormGroup;
  public brand!: FormControl;
  public title!: FormControl;
  public description!: FormControl;
  public price!: FormControl;

  @Output() articleCreated: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>();

  constructor(private articleService: ArticleService) { }


  ngOnInit(): void {
    this.createFormControls();
    this.createFormModel();
  }

  createFormControls(): void {
    this.brand = new FormControl('', Validators.required);
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
  }

  submitForm(): void {
    if (this.formArticle.valid) {
        const formData = this.formArticle.value;
        console.log('Données du formulaire à envoyer :', formData);
        this.articleService.save(formData).subscribe(() => {
            this.articleCreated.emit();
            this.formArticle.reset();
        });
    } else {
        console.error("Le formulaire n'est pas valide.");
    }
}

  createFormModel(): void {
    this.formArticle = new FormGroup ({
        brand : this.brand,
        title : this.title,
        description : this.description,
        price : this.price
    });
  }
}
