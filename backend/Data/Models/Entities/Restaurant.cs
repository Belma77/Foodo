using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Restaurant : User
    {
        public Restaurant() { }

        public Restaurant(string name, string email, string password) : base(email, password)
        {
            this.name = name;
        }

        public string name { get; set; }

        public List<Order> orders{ get; set; }

    }
}
