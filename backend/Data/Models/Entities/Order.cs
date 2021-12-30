using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Order
    {
        [Key]
        public int id { get; set; }

        public Customer customer { get; set; }

        public Restaurant restaurant { get; set; }

        public Courier courier { get; set; }

        [NotMapped]
        public Location startLocation { get; set; }

        [NotMapped]
        public Location endLocation { get; set; }

        public DateTime requestTime { get; set; }

        public OrderStatus orderStatus { get; set; }

        //Todo: Change this to Payment object
        public double price { get; set; }

        public Order()
        {
            orderStatus = OrderStatus.CREATED;
        }

        public Order(int id, Customer customer, Restaurant restaurant, Courier courier, Location startLocation, Location endLocation, DateTime requestTime, OrderStatus orderStatus, double price)
        {
            this.id = id;
            this.customer = customer;
            this.restaurant = restaurant;
            this.courier = courier;
            this.startLocation = startLocation;
            this.endLocation = endLocation;
            this.requestTime = requestTime;
            this.orderStatus = orderStatus;
            this.price = price;
        }
    }
}
