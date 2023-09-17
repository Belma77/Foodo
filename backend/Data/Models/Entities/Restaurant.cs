using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Restaurant:User
    {
        public Restaurant() { }

        public string name { get; set; }

        public string slug { get; set; }

        public string avgDeliveryTime { get; set; }

        public double deliveryCost { get; set; }

        public double rating { get; set; }

        public int numberOfReviews { get; set; }

        public string logoImage {get; set; }

        public string headerImage { get; set; } 

        public ICollection<Product> Products { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public string phoneNumber { get; set; }
        public ICollection<Reviews> Reviews{ get; set; }


    }
}
