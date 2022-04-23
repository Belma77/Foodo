// import { CreditCard } from './credit-card.model';
// import { stat } from 'fs';
import { LOADERS } from 'ngx-spinner';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';
//import { Restaurant } from './restaurant.model';
import { UserBase } from './userBase.model';

export abstract class User {

  Id: number | undefined;

  email: string | undefined;
  password?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  phoneNumber?: string | undefined;
  verified?: boolean | undefined;
  token?: string | undefined;
  // creditCard: CreditCard,
  //profileImage: String,
  //userStatus: UserStatus,
  role?: UserRole | undefined;

    constructor(id:number,email:string, password:string, createdAt:Date, updatedAt:Date, phoneNumber:string, verified:boolean,  token:string, role:UserRole)
    {
this.Id =id;
this.email=email;
this.password=password;
this.createdAt=createdAt;
this.updatedAt=updatedAt;
this.verified=verified;
this.phoneNumber=phoneNumber;
this.token=token;
this.role=role;
    }
}
