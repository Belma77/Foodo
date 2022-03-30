// import { CreditCard } from './credit-card.model';
// import { stat } from 'fs';
import { LOADERS } from 'ngx-spinner';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';
import { Restaurant } from './restaurant.model';
import { UserBase } from './userBase.model';

export abstract class User {

  Id: number | undefined;

  email: string | undefined;
  password: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  //phoneNumber: String,
  //verified: boolean,
  token: string | undefined;
  // creditCard: CreditCard,
  //profileImage: String,
  //userStatus: UserStatus,
  role: UserRole | undefined;
  //private dateofBirth:Date
    constructor()
    {

    }
}
