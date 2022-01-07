using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public bool isLandmark { get; set; }

        public string landmarkName { get; set; }

        public Location() { }

        public Location(int id, double latitude, double longitude, bool isLandmark, string landmarkName)
        {
            this.Id = id;
            this.latitude = latitude;
            this.longitude = longitude;
            this.isLandmark = isLandmark;
            this.landmarkName = landmarkName;
        }
    }
}
