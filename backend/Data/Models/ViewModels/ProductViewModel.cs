using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    internal class ProductViewModel
    {
        public int Id { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public double price { get; set; }

        public string image { get; set; }

        public int categoryid { get; set; }

        public int restaurantId { get; set; }
    }
}
