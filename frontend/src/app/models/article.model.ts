export class ArticleModel {

    constructor(
        public id: string,
        public brand: string,
        public title: string,
        public description: Text,
        public price: Number,
    ){}
}