import { Location } from "./location";
import { Product } from "./product";

export class Restaurant {
    id!:number;
    slug!:string;
    email!:string;
    name!: string;
    avgDeliveryTime!: string;
    deliveryCost!:number;
    rating!:number;
    numberOfReviews!:number;
    image!:string;
    products!:Product[];
    location!:Location;
}