import { UserModel } from './user.model';

export class AddressModel {

    constructor(
        public id: number,
        public city: string,
        public streetName: string,
        public streetNumber: string,
        public zipCode: string,
        public userId?: number
    ) {}

    
}