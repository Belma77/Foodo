export enum OrderStatus
{
    CREATED = "CREATED",
    REJECTED = "REJECTED",
    IN_PREPARATION = "IN_PREPARATION",
    PICKED_UP = "PICKED_UP",
    DELIVERING = "DELIVERING",
    COMPLETED = "COMPLETED",
}
const orderStatus: Array<string> = Object.keys(OrderStatus).filter(key => isNaN(+key));
