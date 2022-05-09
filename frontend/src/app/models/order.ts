import { Courier } from "./courier";
import { Customer } from "./customer";
import { OrderStatus } from "./enums/order-status";
import { OrderLine, OrderLineForm } from "./order-line";
import { Product } from "./product";
import { Restaurant } from "./restaurant";
import { User } from "./user.model";

export class Order {
    id!:number;
    customer!:Customer;
    restaurant!:Restaurant;
    courier!:Courier;
    orderLine!:Record<string, OrderLine>;
    requestTime!:string;
    orderStatus?:OrderStatus;
    price!:number;

}

export class OrderForm {
    id!:number;
    restaurantId!:number;
    orderLine!:Record<string, OrderLine>;
    requestTime!:string;
    orderStatus!:OrderStatus;
    price!:number;
}

export class OrderPost {
    restaurantId!:number;
    orderLine:OrderLineForm[] = [];
}