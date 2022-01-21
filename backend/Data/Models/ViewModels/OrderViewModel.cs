﻿using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class OrderViewModel
    {
        public ICollection<OrderRecordViewModel> orderRecords { get; set; }

        public int restaurantId { get; set; }
    }
}
