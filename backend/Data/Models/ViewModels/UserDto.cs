using Data.Models.Entities;
using Data.Models.Enums;
using Newtonsoft.Json;
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
        public string userName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public UserRole role { get; set; }

        public static explicit operator UserDto(Customer v)
        {
            return JsonConvert.DeserializeObject<UserDto>(JsonConvert.SerializeObject(v));
        }

        public static explicit operator UserDto(User v)
        {
            return JsonConvert.DeserializeObject<UserDto>(JsonConvert.SerializeObject(v));

        }
    }
}
