using backend.Services;
using backend.Services.Impl;
using Data.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

namespace backend.Controllers
{
    [ApiController]
    public abstract class BaseUserController : Controller
    {
        protected readonly IUserService userService;

        public BaseUserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] Restaurant user)
        {
            return Ok(userService.login(user));
        }

    }
}
