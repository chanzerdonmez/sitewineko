export class AddressModel {
    constructor(
      public id: number,
      public name: string,
      public firstName: string,
      public city: string,
      public streetName: string,
      public streetNumber: string,
      public zipCode: string,
      public userId?: number
    ) {}
  }
  