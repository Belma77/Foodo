using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class UpdateStatusDto
    {
        public int orderId{ get; set; }
        public OrderStatus status{ get; set; }
    }
}
