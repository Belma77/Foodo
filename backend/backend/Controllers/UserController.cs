using backend.Filters;
using backend.Services.Impl;
using backend.Utils;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.CustomAuthorizeAttribute;
using static backend.Utils.AuthConstants;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    
        [ApiController]
        [Route("user")]
        public class UsersController : ControllerBase
        {
            private IUserService _userService;

            public UsersController(IUserService userService)
            {
                _userService = userService;
            }


        [HttpGet]
        [Route("doMe")]
        [Authorize(UserRole.Customer, UserRole.Restaurant, UserRole.Courier)]
        public ActionResult<User> doMe()
        {
            try
            {
                int userId = int.Parse(HttpContext.User.Identity.Name);
                return Ok(_userService.doMe(userId));
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

    }
}

