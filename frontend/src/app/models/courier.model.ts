// import { CreditCard } from './credit-card.model';

import * as internal from "stream";
import { UrlWithStringQuery } from "url";
import { UserRole } from "./enums/user-role";
import { UserStatus } from "./enums/user-status";
import { UserBase } from "./userBase.model";

export class Courier extends UserBase {

    

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
        city: String,
        street: String,
        zipCode: String,
        country: String,
        state: String,
        // creditCard: CreditCard,
        profileImage: String,
        userStatus:UserStatus,
        role:UserRole,
        businessName : String,
        numberOfEstablishments: Int32Array
        
    ) {
       super(id, firstName, lastName, email, password, createdAt, updatedAt, phoneNumber, verified, city, street, zipCode, country, state, profileImage, userStatus, role);
       
    }
}
