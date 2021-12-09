using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    class Menu
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public List<Product> products { get; set; }
    }
}
