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
    [Route("courier")]
    [ApiController]
    [Authorize(UserRole.COURIER)]
    public class CourierController : ControllerBase
    {
        private readonly IUserService userService;

        public CourierController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Courier user)
        {
            userService.register(user);
            return Ok();
        }
    }
}
