import { Location } from "./location";
import { Product } from "./product";
import { User } from "./user.model";

export class Restaurant extends User{
    slug!:string;
    name!: string;
    avgDeliveryTime!: string;
    deliveryCost!:number;
    rating!:number;
    numberOfReviews!:number;
    headerImage!:string;
    products!:Product[];
    location!:Location;
}