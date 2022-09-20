// import { CreditCard } from './credit-card.model';

import { UserRole } from "./enums/user-role";
import { UserStatus } from "./enums/user-status";
import {User} from "./user.model";

export class Courier extends User {
        firstName!: string
        lastName!: string
        phoneNumber!: string
        status!: number
        role!:UserRole

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date,
        phoneNumber: string,
        verified: boolean,
        token:string,
        status: number,
        role:UserRole,
    ) {
       super(id,email, role);

    }
}
