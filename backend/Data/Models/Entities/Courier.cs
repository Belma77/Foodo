using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Courier : User
    {
        public Courier(string email, string password) : base(email, password)
        {
        }

        private string firstName { get; set; }

        private string lastName { get; set; }
    }
}
