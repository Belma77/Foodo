using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Customer : User
    {
        public Customer() { }

        public Customer(string email, string password) : base(email, password)
        {
        }

        public string firstName { get; set; }

        public string lastname { get; set; }
    }
}
