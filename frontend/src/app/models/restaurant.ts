import { Product } from "./product";

export class Restaurant {
    id!:number;
    slug!:string;
    title!: string;
    avgDeliveryTime!: string;
    deliveryCost!:number;
    rating!:number;
    numberOfReviews!:number;
    image!:string;
    products!:Product[];
}