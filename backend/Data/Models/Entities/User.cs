using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        private string email { get; set; }

        private string password { get; set; }

    }
}
