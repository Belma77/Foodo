using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class GetOrdersVM
    {
        public int Id { get; set; }
        public GetRestaurantVM Restaurant { get; set; }
        public  GetCourierVM Courier { get; set; }
        public ICollection<OrderRecordViewModel> OrderRecords { get; set; }
        public LocationDto customerLocation { get; set; }
        public double price { get; set; }
    }
}
