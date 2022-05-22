using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;

namespace backend.Filters
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public CustomAuthorizeAttribute(params UserRole[] roles)
        {
            var allowedRolesAsStrings = roles.Select(x => Enum.GetName(typeof(UserRole), x));
            Roles = string.Join(",", allowedRolesAsStrings);
        }

    }
}
