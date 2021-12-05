using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Product
    {
        public Product(string name, string description, double price)
        {
            this.name = name;
            this.description = description;
            this.price = price;
        }

        [Key]
        public int Id { get; set; }

        public string name { get; private set; }

        public string description { get; private set; }

        public double price { get; private set; }

        
    }
}
