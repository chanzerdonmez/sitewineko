export class OrderLineModel {
    constructor(
      public id: number,
      public productName: string,  // Assurez-vous que les noms correspondent
      public quantity: number,  
      public unitPrice: number, 
      public ordersId: number  // Représente la clé étrangère vers Orders
    ) {}
  }
  