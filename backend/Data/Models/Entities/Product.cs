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
        public Product() { }

        public Product(string name, string description, double price, Category category)
        {
            this.name = name;
            this.description = description;
            this.price = price;
            this.Category = category;
        }

        [Key]
        public int Id { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public double price { get; set; }

        public string image { get; set; }   

        public virtual Category Category { get; set; }

        public virtual Restaurant Restaurant { get; set; }  

        public virtual ICollection<OrderRecord> OrderRecords { get; set;}
    }
}
