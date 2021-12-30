using backend.Utils;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class OrderService
    {
        private IHubContext<CourierHub> _hub;

        public OrderService(IHubContext<CourierHub> hub)
        {
            this._hub = hub;
        }

        public void createOrder(Order order)
        {
            order.orderStatus = OrderStatus.CREATED;
            findCourier(order);
        }

        public void findCourier (Order order)
        {
            //Todo: Find closest courier (implement some algorithm)
            string connectionId = ConnectionMapping.GetConnections(1).First();
            _hub.Clients.Client(connectionId).SendAsync("orderOffer", JsonSerializer.Serialize(order));
        }
    }
}
