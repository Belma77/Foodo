import { Product } from "./product";

export class OrderLine {
    product!:Product;
    quanity!:number;
}

export class OrderLineForm {
    productId!:number;
    quanity!:number;
}