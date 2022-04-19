using backend.Repositories;
using backend.Repositories.Impl;
using backend.Utils;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
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
        private IProductRepository _productRepository;

        public OrderService(IHubContext<CourierHub> hub, IProductRepository productRepository, OrderRepository orderRepository, IUserRepository userRepository)
        {
            _hub = hub;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        public void createOrder(OrderViewModel o)
        {
            Order order = new Order();
            Restaurant r = (Restaurant)_userRepository.findById(o.restaurantId);
            order.Restaurant = r;
            //Customer customer = _userRepository.findById(id)
            order.orderStatus = OrderStatus.CREATED;
            foreach(OrderRecordViewModel or in  o.orderRecords)
            {
                OrderRecord orderRecord = new OrderRecord();
                Product product = _productRepository.find(or.productId);
                orderRecord.Product = product;
                orderRecord.quanity = or.quanity;   
                orderRecord.price = or.price;
                order.OrderRecords.Add(orderRecord);
            }
            _orderRepository.create(order);
            createOrderChanell(order);
            sendOfferToRestaurant(order);
        }

        public Order GetOrder(int id)
        {
            Order o = _orderRepository.findById(id);
            return o;
        }

        private void sendOfferToRestaurant(Order order)
        {
            string connectionId = ConnectionMapping.GetConnections(order.Restaurant.Id).First();
            _hub.Clients.Client(connectionId).SendAsync("orderOffer", JsonSerializer.Serialize(order));
            acceptOrder(order);
        }

        private void createOrderChanell(Order order)
        {
            //addToGroup(order, order.customer);
            addToGroup(order, order.Restaurant);
        }

        private void addToGroup(Order order, User user)
        {
            string chanellName = "order" + order.Id.ToString();
            _hub.Groups.AddToGroupAsync(getConnectionId(user.Id), chanellName);
        }

        public void acceptOrder (Order order)
        {
            //_orderRepository.findById(order.id).orderStatus = OrderStatus.IN_PREPARATION;
            //order.orderStatus = OrderStatus.IN_PREPARATION;
            findCourier(order);
        }

        public void findCourier (Order order)
        {
            //Todo: Find closest courier (implement some algorithm)
            int courierId = 3;
            string connectionid = ConnectionMapping.GetConnections(courierId).First();
            //addToGroup(order, order.courier);
            _hub.Clients.Client(connectionid).SendAsync("orderOffer", JsonSerializer.Serialize(order));
            Console.WriteLine("after hub call to courier");
            //courierAcceptedOffer(order);
        }

        private void courierAcceptedOffer(Order order)
        {
            string chanellName = "order" + order.Id.ToString();
            _hub.Clients.Group(chanellName).SendAsync("orderOffer", JsonSerializer.Serialize(order));
        }

        private string getConnectionId (int id)
        {
            return ConnectionMapping.GetConnections(id).First();
        }
    }
}
