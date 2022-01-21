using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string email { get; set; }

        public UserRole role { get; set; }
    }
}
