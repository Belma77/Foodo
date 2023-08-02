using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Log
    {
        public int Id { get; set; }
        public int StatusCode { get; set; }
        public string ExceptionMessage { get; set; }
        public DateTime logDate{ get; set; }
       
    }
}
