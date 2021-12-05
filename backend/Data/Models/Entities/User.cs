using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class User
    {
        public User(string email, string password)
        {
            this.email = email;
            this.password = password;
        }

        [Key]
        public int Id { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public byte[] StoredSalt { get; set; }



    }
}
