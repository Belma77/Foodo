using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class GetRestaurantVM
    {
        public int Id { get; set; }

        public string email { get; set; }
        public UserRole role { get; set; }

        public string name { get; set; }

        public string slug { get; set; }

        public string avgDeliveryTime { get; set; }

        public double deliveryCost { get; set; }

        public double rating { get; set; }

        public int numberOfReviews { get; set; }

        public string logoImage { get; set; }

        public string headerImage { get; set; }
    }
}
