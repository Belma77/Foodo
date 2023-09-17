import { Courier } from "./courier";
import { Customer } from "./customer";
import { OrderStatus } from "./enums/order-status";
import { OrderRecord, OrderRecordForm} from "./order-line";
import { Product } from "./product";
import { Restaurant } from "./restaurant";
import { User } from "./user.model";

export class Order {
    id!:number;
    customer!:Customer;
    restaurant!:Restaurant;
    courier!:Courier;
    orderRecords!:Record<string, OrderRecord>;
    requestTime!:string;
    orderStatus!:OrderStatus;
    price!:number;
    rated!:boolean;
    customerLocation!:any;
    restaurantLocation!:any;
}

export class OrderForm {
    id!:number;
    restaurantId!:number;
    orderRecords!:Record<string, OrderRecord>;
    requestTime!:string;
    orderStatus!:OrderStatus;
    price!:number;
}

export class OrderPost {
    restaurantId!:number;
    orderRecords:OrderRecordForm[] = [];
}
