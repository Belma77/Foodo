// import { CreditCard } from './credit-card.model';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';


export abstract class UserBase {
    Id: number;
    createdAt: Date;
    updatedAt: Date;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    profileImage: String | null;
    phoneNumber: String | null;
    verified: boolean | null;

    // creditCard: CreditCard | null;
    userStatus: UserStatus;
    role: UserRole;

    constructor(
        Id: number,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        createdAt: Date,
        updatedAt: Date,


        phoneNumber: String,
        verified: boolean,

        // creditCard: CreditCard,
        profileImage: String,
        userStatus: UserStatus,
        role: UserRole
    ) {
        this.Id = Id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;


        this.phoneNumber = phoneNumber;
        this.verified = verified;

        // this.creditCard = creditCard;
        this.profileImage = profileImage;
        this.role = role;
        this.userStatus = userStatus;
    }
}
