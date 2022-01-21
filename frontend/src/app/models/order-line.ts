import { Product } from "./product";

export class OrderLine {
    product!:Product;
    quanity!:number;
    price!:number;
}

export interface OrderLineForm {
    productId:number;
    quanity:number;
    price:number;
}