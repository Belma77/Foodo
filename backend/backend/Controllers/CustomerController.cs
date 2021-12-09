using backend.Services;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

namespace backend.Controllers
{
    [Route("customer")]
    [ApiController]
    [Authorize(UserRole.CUSTOMER)]
    public class CustomerController : ControllerBase
    {
        private readonly IUserService userService;

        public CustomerController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Restaurant user)
        {
            userService.register(user);
            return Ok();
        }
    }
}
