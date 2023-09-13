
import { LOADERS } from 'ngx-spinner';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';

export abstract class User {

  id?: number | undefined;
  email: string | undefined;
  
  role:string;

  constructor(id: number , email: string , role: string ) {
    this.id = id
    this.email = email
    this.role = role
  }
  
}
