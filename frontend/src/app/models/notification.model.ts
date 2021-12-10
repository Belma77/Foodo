import { NotificationStatus } from './enums/notification-status';
import { NotificationType } from './enums/notification-type';
// import { Product } from './products.model';
import { User } from './user.model';

export class Notification {
    id: number;
    createdAt:Date;
    title: string;
    description: string;
    type: NotificationType;
    status: NotificationStatus;
    user: User;
    // product: Product;

    constructor(
        id: number,
        createdAt:Date,
        title: string,
        description: string,
        type: NotificationType,
        status: NotificationStatus,
        user: User,
        // product: Product
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.user = user;
        // this.product = product;
    }
}
