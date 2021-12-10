// import { CreditCard } from './credit-card.model';
import { UserRole } from './enums/user-role';
import { UserStatus } from './enums/user-status';


export class User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    profileImage: String | null;
    
    dateOfBirth: Date | null;
    phoneNumber: String | null;
    verified: boolean | null;
    city: String | null;
    street: String | null;
    zipCode: String | null;
    country: String | null;
    state: String | null;
    // creditCard: CreditCard | null;
    userStatus: UserStatus;
    role: UserRole;

    constructor(
        id: number,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        createdAt: Date,
        updatedAt: Date,
        
        dateOfBirth: Date,
        phoneNumber: String,
        verified: boolean,
        city: String,
        street: String,
        zipCode: String,
        country: String,
        state: String,
        // creditCard: CreditCard,
        profileImage: String,
        userStatus: UserStatus,
        role: UserRole
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.verified = verified;
        this.city = city;
        this.street = street;
        this.zipCode = zipCode;
        this.country = country;
        this.state = state;
        // this.creditCard = creditCard;
        this.profileImage = profileImage;
        this.role = role;
        this.userStatus = userStatus;
    }
}
