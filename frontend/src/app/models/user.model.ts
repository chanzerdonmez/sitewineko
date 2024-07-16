export class UserModel {

  constructor(
      public id: number,
      public name: string,
      public firstName: string,
      public email: string,
      public password: string,
      public dateCreation: Date,
      public role: string,
      public roleName: string,
      public token: string,
  ){}
}
