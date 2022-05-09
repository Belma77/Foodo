import {User} from "./user.model";
import {UserRole} from "./enums/user-role";
import { Location } from "./location";

export class Customer extends User {

    firstName!: string;
    lastName!: string;
    location!:Location;


  }




