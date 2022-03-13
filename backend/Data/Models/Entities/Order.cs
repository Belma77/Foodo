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
        public int Id { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Restaurant Restaurant { get; set; }

        public virtual Courier Courier { get; set; }

        public virtual ICollection<OrderRecord> OrderRecords { get; set; }  = new List<OrderRecord>();  

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
            this.Id = id;
            this.Customer = customer;
            this.Restaurant = restaurant;
            this.Courier = courier;
            this.startLocation = startLocation;
            this.endLocation = endLocation;
            this.requestTime = requestTime;
            this.orderStatus = orderStatus;
            this.price = price;
        }
    }
}
