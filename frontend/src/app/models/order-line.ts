import { Product } from "./product";

export class OrderRecord {
    product!:Product;
    quanity!:number;
}

export class OrderRecordForm {
    productId!:number;
    quanity!:number;
}
