using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class OrderRecordViewModel
    {
        public ProductViewModel Product { get; set; }
        public int productId { get; set; }  
        public int quanity { get; set; }

    }
}
