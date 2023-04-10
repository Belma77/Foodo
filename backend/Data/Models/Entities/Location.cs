using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Entities
{
    public class Location
    {
        [Key]
        public int Id { get; set; }

        public double latitude { get; set; }

        public double longitude { get; set; }

        public string formatedAdress { get; set; }
        public int? floor { get; set; }
        public string? apartmentNo { get; set; }
        public string? note { get; set; }
        public Customer Customer{ get; set; }
        public int CustomerId { get; set; }
        public  bool isCurrent { get; set; }
        public Location() { }

        public Location(int id, double latitude, double longitude)
        {
            this.Id = id;
            this.latitude = latitude;
            this.longitude = longitude;
           
        }
    }
}
