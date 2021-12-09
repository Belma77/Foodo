using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Category
    {
        public Category() { }

        public Category(int id, string name)
        {
            this.id = id;
            this.name = name;
        }

        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public ICollection<Product> products { get; set; } = new HashSet<Product>();

    }
}
