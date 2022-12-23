using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.ViewModels
{
    public class GetCourierVM
    {
        public int Id { get; set; }

        public string email { get; set; }

        public UserRole role { get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }

        public CourierWorkingStatus status { get; set; }
    }
}
