using backend.Services;
using backend.Services.Impl;
using Data.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] User user)
        {
            return Ok(userService.login(user));
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] User user)
        {
            userService.register(user);
            return Ok();
        }
    }
}
