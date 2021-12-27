using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class ResponseToken
    {
        public ResponseToken(string token)
        {
            this.token = token;
        }
        public string token { get; set; }
    }
}
