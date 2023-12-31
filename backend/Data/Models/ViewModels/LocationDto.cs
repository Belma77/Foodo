﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class LocationDto
    {
        public int Id { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string formatedAdress { get; set; }
        public int? floor { get; set; }
        public string? apartmentNo { get; set; }
        public string? note { get; set; }
        public CustomerVM Customer { get; set; }
        public int CustomerId { get; set; }
        public bool isCurrent { get; set; }
    }
}
