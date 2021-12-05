using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Utils
{
    public static class AuthConstants
    {
        public static string KEY = Startup.Configuration["jwt:Key"];
        public static string USER_TYPED_KEY = "user";
    }


}

