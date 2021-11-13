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
        [Key]
        public int Id { get; set; }

        private string name { get; set; }

        private string description { get; set; }

        private double price { get; set; }
    }
}
