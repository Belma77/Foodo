// import { CreditCard } from './credit-card.model';
// import { stat } from 'fs';
import { LOADERS } from 'ngx-spinner';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';
//import { Restaurant } from './restaurant.model';

export abstract class User {

  id?: number | undefined;
  email: string | undefined;
  role?: UserRole | undefined;

  constructor(id: number , email: string , role?: UserRole ) {
    this.id = id
    this.email = email
    this.role = role
  }
  
}
