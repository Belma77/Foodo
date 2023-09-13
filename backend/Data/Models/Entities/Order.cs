using Data.Models.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
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

        public Customer Customer { get; set; }

        public Restaurant Restaurant { get; set; }

        public int RestaurantId { get; set; }   

        public Courier Courier { get; set; }

        public ICollection<OrderRecord> OrderRecords { get; set; }  = new List<OrderRecord>();  

        public Location restaurantLocation { get; set; }
        public Location customerLocation { get; set; }

        public DateTime requestTime { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public OrderStatus orderStatus { get; set; }

        public double price { get; set; }
        public bool Rated { get; set; }
        public Order()
        {
            orderStatus = OrderStatus.CREATED;
        }

    }
}
