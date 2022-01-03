using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Enums
{
    public enum OrderStatus
    {
        CREATED,
        REJECTED,
        IN_PREPARATION,
        PICKED_UP,
        DELIVERING,
        COMPLETED,
    }
}
