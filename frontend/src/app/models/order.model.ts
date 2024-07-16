import { UserModel } from './user.model';


export class OrderModel {

    constructor(
        public id: number,
        public city: string,
        public numberOrder: string,
        public streetNumber: string,
        public zipCode: string,
        public dateCreation: Date,
        public user: UserModel | null
    ) {}

    
}
