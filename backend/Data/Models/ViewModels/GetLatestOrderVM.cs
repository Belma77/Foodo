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
    public class GetLatestOrderVM
    {
        public int Id { get; set; }
        public GetRestaurantVM Restaurant { get; set; }
        public GetCourierVM Courier { get; set; }
        public bool Rated { get; set; }
       
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderStatus orderStatus { get; set; }


    }
}
