export interface CartLine {
    id: number;
    articleId: number;
    quantity: number;
    price: number;
    article: {
        id: number;
        title: string;
        price: number;
        image: string; // Ajoutez cette ligne pour inclure l'image
    };
}