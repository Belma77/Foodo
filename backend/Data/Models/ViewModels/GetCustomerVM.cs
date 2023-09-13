using Data.Models.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class GetCustomerVM
    {
        public int Id { get; set; }
        public string email { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public UserRole role { get; set; }
        public int ConnectioId { get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }
    }

}
