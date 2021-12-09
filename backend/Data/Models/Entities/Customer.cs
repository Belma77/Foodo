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

        private string firstName { get; set; }

        private string lastname { get; set; }
    }
}
