import { UserModel } from './user.model';
import { OrderLineModel } from './orderLine.model';
import { AddressModel } from './address.model';

export class OrderModel {
  constructor(
    public id: number,
    public numberOrder: string,
    public dateCreation: Date,
    public userEmail: string, // Assurez-vous que c'est bien userEmail
    public orderLines: OrderLineModel[], // Array of OrderLineModel
    public billingAddress: AddressModel, // Add this line
    public shippingAddress: AddressModel,  // Add this line
    public totalPrice: number // Add this line

  ) {}
}
