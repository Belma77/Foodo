using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class OrderViewModel
    {
        public int Id { get; set; }

        public GetCustomerVM Customer { get; set; }

        public RestaurantVM Restaurant { get; set; }

        public CourierVM Courier { get; set; }

        public LocationDto restaurantLocation { get; set; }
        public LocationDto customerLocation { get; set; }

        public DateTime requestTime { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public OrderStatus orderStatus { get; set; }

        public double price { get; set; }
        public bool Rated { get; set; }
        public OrderRecordViewModel[] orderRecords { get; set; }

        public int restaurantId { get; set; }
    }
}
