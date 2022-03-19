// import { CreditCard } from './credit-card.model';
// import { stat } from 'fs';
import { LOADERS } from 'ngx-spinner';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';
import { Restaurant } from './restaurant.model';
import { UserBase } from './userBase.model';


export  class User extends UserBase {

    birthofDate!: Date | null;
    constructor(
        id: number,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        createdAt: Date,
        updatedAt: Date,
        phoneNumber: String,
        verified: boolean,
        token:string,
        // creditCard: CreditCard,
        profileImage: String,
        userStatus: UserStatus,
        role: UserRole,
        private dateofBirth:Date
    ) {
        super(id, firstName, lastName, email, password, createdAt, updatedAt, phoneNumber, verified, profileImage, userStatus,role);
        
        this.dateofBirth = dateofBirth;
       
    }
}
