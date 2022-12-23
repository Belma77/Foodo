using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public  class Reviews
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Restaurant Restaurant { get; set; }
        public int RestaurantId { get; set; }
        public int Review { get; set; }
    }
}
