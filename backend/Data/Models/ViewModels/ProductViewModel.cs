using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class ProductViewModel
    {
        public string name { get; set; }

        public string description { get; set; }

        public double price { get; set; }

        public int category { get; set; }

    }
}
