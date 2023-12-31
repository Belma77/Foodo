﻿using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Stripe.Checkout;
using System.Collections.Generic;

namespace backend.Services.Interfaces
{
    public interface IOrderService
    {
        void createOrder(OrderViewModel o, int userId);
        List<SessionLineItemOptions> CreatesessionLineItemOptions(OrderViewModel o);
        OrderViewModel GetOrder(int id);
        CourierVM findCourier(Order order);
        void restaurantAcceptOrder(Order order);
        GetLatestOrderVM GetUnratedOrder(int userId);
        List<GetOrdersVM> GetCompletedOrders(int courierId);

        List<Order> getPendingAndActiveOrders(int restaurantId);

        Order GetActiveOrder(int courierId);
        List<Order> getPendingOrdersByCourier(int courierId);
        OrderViewModel UpdateOrderStatus(UpdateStatusDto dto);
    }
}
