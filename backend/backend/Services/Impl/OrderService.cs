using AutoMapper;
using backend.Controllers;
using backend.ErrorHandler;
using backend.Repositories;
using backend.Repositories.Impl;
using backend.Services.Interfaces;
using backend.Utils;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using EllipticCurve.Utils;
using Microsoft.AspNetCore.Http;
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
    public class OrderService:IOrderService
    {
        private IHubContext<CustomHub> _hub;
        private IOrderRepository _orderRepository;
        private IUserRepository _userRepository;
        private IProductRepository _productRepository;
        private IMapper _mapper;
        private ILocationRepository _locationRepository;

        public OrderService(IHubContext<CustomHub> hub, 
            IProductRepository productRepository, 
            IOrderRepository orderRepository, 
            IUserRepository userRepository, 
            IMapper mapper,
            ILocationRepository locationRepository

            )
        {
            _hub = hub;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _locationRepository = locationRepository;
        }

        public void createOrder(OrderViewModel o, int userId)
        {
            
            Order order = new Order();
            Restaurant r = (Restaurant)_userRepository.findById(o.restaurantId);
            order.Restaurant = r;

            Customer customer = (Customer) _userRepository.findById(userId);
            order.Customer = customer;

            var location=_locationRepository.GetCurrent(userId);
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
            var resLocation = _locationRepository.GetById(1);
            order.restaurantLocation=resLocation;
            order.customerLocation = location;
            _orderRepository.create(order);
            
           sendOfferToRestaurant(order.Id);
           
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
        public OrderViewModel GetOrder(int id)
        {
            Order order = _orderRepository.findById(id);
            return _mapper.Map<OrderViewModel>(order);
        }

        private void sendOfferToRestaurant(int orderId)
        {
            Order order = _orderRepository.findById(orderId);
            var o = _mapper.Map<OrderViewModel>(order);
            string connectionId = ConnectionMapping.GetConnections(order.RestaurantId.ToString()).LastOrDefault();
            if (connectionId != null)
            {
                _hub.Clients.Client(connectionId).SendAsync("orderOffer", o, "Restaurant");
                Console.WriteLine(UserRole.Restaurant);

            }
        }
        public void sendOfferToCourier(int orderId)

        {
            Order o = _orderRepository.findById(orderId);
            Courier courier = _userRepository.findActiveCourier();
            o.Courier = courier;
            _orderRepository.update(o);
            var order = _mapper.Map<OrderViewModel>(o);
            string connectionId = ConnectionMapping.GetConnections(courier.Id.ToString()).LastOrDefault();
            if (connectionId == null)
            {
                return;
            }
            _hub.Clients.Client(connectionId).SendAsync("orderOffer", order, "Courier");
            Console.WriteLine("poslano kuriru");
        }

        private void createOrderChannel(Order order)
        {
            addToGroup(order, order.Courier);
            addToGroup(order, order.Restaurant);
        }

        private void addToGroup(Order order, User user)
        {
            string chanellName = "order" + order.Id.ToString();
             _hub.Groups.AddToGroupAsync(getConnectionId(user.Id.ToString()), chanellName);
        }

        
        public CourierVM findCourier (Order order)
        {
            Courier courier = _userRepository.findActiveCourier();
            return _mapper.Map<CourierVM>(courier);
        }

        private void courierAcceptedOffer(Order order)
        {
            string chanellName = "order" + order.Id.ToString();
            _hub.Clients.Group(chanellName).SendAsync("orderOffer", JsonSerializer.Serialize(order));
        }

        private string getConnectionId (string id)
        {
            return ConnectionMapping.GetConnections(id).Last();
        }

        public void restaurantAcceptOrder(Order order)
        {
           Order Order=_orderRepository.findById(order.Id);
            Order.orderStatus = OrderStatus.IN_PREPARATION;
            _orderRepository.update(Order);
            sendOfferToCourier(order.Id);
        }

        public Order GetActiveOrder(int courierId)
        {
            var order = _orderRepository.GetActive(courierId);
            return order;
            
        }

        public GetLatestOrderVM GetUnratedOrder(int userId)
        {
            var order = _orderRepository.GetUnratedOrder(userId);
            if (order != null)
            {
                var mapped = _mapper.Map<GetLatestOrderVM>(order);
                Console.WriteLine(mapped.orderStatus);
                return mapped;
            }
            return null;


        }

        public List<GetOrdersVM> GetCompletedOrders(int courierId)
        {
            return _mapper.Map<List<GetOrdersVM>>(_orderRepository.GetCompletedOrders(courierId));
        }

        public List<Order> getPendingAndActiveOrders(int restaurantId)
        {
            return _orderRepository.getPendingAndActive(restaurantId);
        }

        public List<Order> getPendingOrdersByCourier(int courierId)
        {
            var orders= _orderRepository.getPendingOrdersByCourier(courierId);
            return orders;
        }

        public OrderViewModel UpdateOrderStatus(UpdateStatusDto dto)
        {
            var order = _orderRepository.findById(dto.orderId);
            if (order == null)
                throw new DomainNotFound("Not found");
            order.orderStatus = dto.status;
            _orderRepository.update(order);
            return _mapper.Map<OrderViewModel>(order);

        }
    }
}
