using backend.Controllers;
using backend.Repositories;
using backend.Repositories.Impl;
using backend.Utils;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.SignalR;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Customer = Data.Models.Entities.Customer;
using Order = Data.Models.Entities.Order;
using Product = Data.Models.Entities.Product;

namespace backend.Services.Impl
{
    public class OrderService
    {
        private IHubContext<CustomHub> _hub;
        private OrderRepository _orderRepository;
        private IUserRepository _userRepository;
        private IProductRepository _productRepository;
        private OrderService _orderService;

        public OrderService(IHubContext<CustomHub> hub, IProductRepository productRepository, OrderRepository orderRepository, IUserRepository userRepository)
        {
            _hub = hub;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        public void createOrder(OrderViewModel o, int userId)
        {
            Console.WriteLine(o.orderRecords);
            Order order = new Order();
            Restaurant r = (Restaurant)_userRepository.findById(o.restaurantId);
            order.Restaurant = r;

            Customer customer = (Customer) _userRepository.findById(userId);
            order.Customer = customer;

            order.orderStatus = OrderStatus.CREATED;
            foreach (OrderRecordViewModel or in o.orderRecords)
            {
                OrderRecord orderRecord = new OrderRecord();
                Product product = _productRepository.find(or.productId);
                orderRecord.Product = product;
                orderRecord.quanity = or.quanity;
                orderRecord.price = or.quanity * product.price;
                order.OrderRecords.Add(orderRecord);
                order.price += orderRecord.price;
            }
            
            _orderRepository.create(order);


            //sendOfferToRestaurant(order.Id);
            sendOfferToCourier(order.Id);
           
        }
        public string CreateSession(OrderViewModel o)
        {

            var options = new SessionCreateOptions
            {
                 LineItems=CreatesessionLineItemOptions(o),

            Mode = "payment",
                SuccessUrl = "https://example.com/success",
                CancelUrl = "https://example.com/cancel",
            };

        var service = new SessionService();
        Session session = service.Create(options);
           
            return   session.Url;
            
        }

        public List<SessionLineItemOptions> CreatesessionLineItemOptions(OrderViewModel o)
        {
            var LineItems = new List<SessionLineItemOptions>();
            
            foreach (OrderRecordViewModel or in o.orderRecords) {
                Product product = _productRepository.find(or.productId);
                var option=new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long?)(product.price*100),
                        Currency = "bam",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = product.name,
                        },
                    },
                    Quantity = or.quanity,
                };
                LineItems.Add(option);
             }
            return LineItems;
        }
        public Order GetOrder(int id)
        {
            Order o = _orderRepository.findById(id);
            return o;
        }

        private void sendOfferToRestaurant(int orderId)
        {
            Order order = _orderRepository.findById(orderId);
            string connectionId = ConnectionMapping.GetConnections(order.RestaurantId.ToString()).FirstOrDefault();
            _hub.Clients.Client(connectionId).SendAsync("orderOffer", order);
            Console.WriteLine("poslano restoranu");

            Console.WriteLine(order.OrderRecords);
        }
        public void sendOfferToCourier(int orderId)

        {
            Order o = _orderRepository.findById(orderId);
            Courier courier = _userRepository.findActiveCourier();
            string connectionId = ConnectionMapping.GetConnections(courier.Id.ToString()).FirstOrDefault();
            _hub.Clients.Client(connectionId).SendAsync("orderOffer", o);
            Console.WriteLine("poslano kuriru");
        }

        private void createOrderChannel(Order order)
        {
            //addToGroup(order, order.customer);
            //addToGroup(order, order.Restaurant);
        }

        private void addToGroup(Order order, User user)
        {
            string chanellName = "order" + order.Id.ToString();
            _hub.Groups.AddToGroupAsync(getConnectionId(user.Id.ToString()), chanellName);
        }

        
        public Courier findCourier (Order order)
        {
            //Todo: Find closest courier(implement some algorithm)
            Courier courier = _userRepository.findActiveCourier();
            //string connectionid = ConnectionMapping.GetConnections(courier.connectiod).First();
            //addToGroup(order, order.Courier);
            //_hub.Clients.Client(connectionid).SendAsync("orderOffer", JsonSerializer.Serialize(order));
            //Console.WriteLine("after hub call to courier");
            //courierAcceptedOffer(order);
            return courier;
        }

        private void courierAcceptedOffer(Order order)
        {
            string chanellName = "order" + order.Id.ToString();
            _hub.Clients.Group(chanellName).SendAsync("orderOffer", JsonSerializer.Serialize(order));
        }

        private string getConnectionId (string id)
        {
            return ConnectionMapping.GetConnections(id).First();
        }
        public void restaurantAcceptOrder(Order order)
        {
            _orderRepository.findById(order.Id).orderStatus = OrderStatus.IN_PREPARATION;
            order.orderStatus = OrderStatus.IN_PREPARATION;
            
        }
    }
}
