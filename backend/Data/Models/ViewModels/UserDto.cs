using Data.Models.Entities;
using Data.Models.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
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
        [JsonConverter(typeof(StringEnumConverter))]
        public UserRole role { get; set; }
        public CourierWorkingStatus? Status { get; set; }
        public int ConnectioId{ get; set; }
        public string name { get; set; }

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
