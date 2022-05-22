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
            this.Id = id;
            this.name = name;
        }

        [Key]
        public int Id { get; set; }

        public string name { get; set; }

        public virtual ICollection<Product> Products { get; set; } = new HashSet<Product>();

    }
}
