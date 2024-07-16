import { CategoryModel } from './category.model';

export class ArticleModel {
  constructor(
    public id: number,
    public brand: string,
    public title: string,
    public description: string,
    public image: string,
    public price: number,
    public dateCreation: Date,
    public active: boolean,
    public category: CategoryModel | null
  ) {}
}
