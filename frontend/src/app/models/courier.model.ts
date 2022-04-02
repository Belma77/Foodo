// import { CreditCard } from './credit-card.model';

import * as internal from "stream";
import { UrlWithStringQuery } from "url";
import { UserRole } from "./enums/user-role";
import { UserStatus } from "./enums/user-status";
import { UserBase } from "./userBase.model";
import {User} from "./user.model";

export class Courier extends User {

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
        //street: String,
        //zipCode: String,

        // creditCard: CreditCard,
       // profileImage: String,
        userStatus:UserStatus,
        role:UserRole,
    ) {
       super(id,email, password, createdAt, updatedAt, phoneNumber, verified,token, role);

    }
}
