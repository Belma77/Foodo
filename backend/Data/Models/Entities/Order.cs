using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public Customer Customer { get; set; }

        public Restaurant Restaurant { get; set; }

        public int RestaurantId { get; set; }   

        public Courier Courier { get; set; }

        public ICollection<OrderRecord> OrderRecords { get; set; }  = new List<OrderRecord>();  

        [NotMapped]
        public Location startLocation { get; set; }

        [NotMapped]
        public Location endLocation { get; set; }

        public DateTime requestTime { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus orderStatus { get; set; }

        //Todo: Change this to Payment object
        public double price { get; set; }

        public Order()
        {
            orderStatus = OrderStatus.CREATED;
        }

    }
}
