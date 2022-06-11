using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class OrderRecord
    {
        public int Id { get; set; } 

        public int quanity { get; set; }

        public double price { get; set; }  

        public Product Product { get; set; }

        public int ProductId { get; set; }  
    }
}
