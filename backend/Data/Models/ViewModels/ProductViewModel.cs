using Data.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class ProductViewModel
    {

        public int id{ get; set; }
        public string name { get; set; }

        public string description { get; set; }

        public double price { get; set; }

        public int categoryId { get; set; }
        public string image { get; set; }

        public virtual CategoryVM Category { get; set; }


        public virtual RestaurantVM Restaurant { get; set; }

        public ICollection<OrderRecordViewModel> OrderRecords { get; set; }

    }
}
