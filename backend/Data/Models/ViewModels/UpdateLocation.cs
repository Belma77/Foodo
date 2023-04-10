using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class UpdateLocation
    {
        public Location location { get; set; }
        public int customerId { get; set; }
    }
}
