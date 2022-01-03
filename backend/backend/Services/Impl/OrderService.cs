using backend.Repositories;
using backend.Repositories.Impl;
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
        private OrderRepository _orderRepository;
        private IUserRepository _userRepository;

        public OrderService(IHubContext<CourierHub> hub, OrderRepository orderRepository, IUserRepository userRepository)
        {
            _hub = hub;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        public void createOrder(Order order)
        {
            order.orderStatus = OrderStatus.CREATED;
            createOrderChanell(order);
            sendOfferToRestaurant(order);
        }

        private void sendOfferToRestaurant(Order order)
        {
            string connectionId = ConnectionMapping.GetConnections(order.restaurant.Id).First();
            _hub.Clients.Client(connectionId).SendAsync("orderOffer", JsonSerializer.Serialize(order));
            acceptOrder(order);
        }

        private void createOrderChanell(Order order)
        {
            addToGroup(order, order.customer);
            addToGroup(order, order.restaurant);
        }

        private void addToGroup(Order order, User user)
        {
            string chanellName = "order" + order.id.ToString();
            _hub.Groups.AddToGroupAsync(getConnectionId(user.Id), chanellName);
        }

        public void acceptOrder (Order order)
        {
            //_orderRepository.findById(order.id).orderStatus = OrderStatus.IN_PREPARATION;
            order.orderStatus = OrderStatus.IN_PREPARATION;
            findCourier(order);
        }

        public void findCourier (Order order)
        {
            //Todo: Find closest courier (implement some algorithm)
            int courierId = 3;
            string connectionid = ConnectionMapping.GetConnections(courierId).First();
            addToGroup(order, order.courier);
            _hub.Clients.Client(connectionid).SendAsync("orderOffer", JsonSerializer.Serialize(order));
            Console.WriteLine("after hub call to courier");
            //courierAcceptedOffer(order);
        }

        private void courierAcceptedOffer(Order order)
        {
            string chanellName = "order" + order.id.ToString();
            _hub.Clients.Group(chanellName).SendAsync("orderOffer", JsonSerializer.Serialize(order));
        }

        private string getConnectionId (int id)
        {
            return ConnectionMapping.GetConnections(id).First();
        }
    }
}
