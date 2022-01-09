import { Courier } from "./courier";
import { Customer } from "./customer";
import { OrderStatus } from "./enums/order-status";
import { OrderLine } from "./order-line";
import { Product } from "./product";
import { Restaurant } from "./restaurant";
import { User } from "./user.model";

export class Order {
    id!:number;
    customer!:Customer;
    restaurant!:Restaurant;
    courier!:Courier;
    orderLine!:Map<number, OrderLine>;
    requestTime!:string;
    orderStatus!:OrderStatus;
    price!:number;

}