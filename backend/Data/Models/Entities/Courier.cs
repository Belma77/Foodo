﻿using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Courier : User
    {
        public Courier() { }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public CourierWorkingStatus status { get; set; }
    }
}
