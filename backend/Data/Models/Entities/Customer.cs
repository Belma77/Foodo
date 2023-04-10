using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Customer : User
    {
        public Customer() { }

        public Customer(string email, string password, string firstName, string lastName) : base(email, password)
        {
            this.firstName = firstName;
            this.lastname = lastName;
        }

        public string firstName { get; set; }

        public string lastname { get; set; }
        public Customer customer { get; set; }
        public int customerId { get; set; }

    }
}
