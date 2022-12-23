export enum OrderStatus
{
    CREATED = "CREATED",
    REJECTED = "REJECTED",
    IN_PREPARATION = "IN_PREPARATION",
    PICKED_UP = "PICKED_UP",
    DELIVERING = "DELIVERING",
    COMPLETED = 5,
}
const orderStatus: Array<string> = Object.keys(OrderStatus).filter(key => isNaN(+key));

