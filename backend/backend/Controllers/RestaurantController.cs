using AutoMapper;
using backend.Services;
using backend.Services.Impl;
using Data;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

namespace backend.Controllers
{
    [ApiController]
    [Route("restaurant")]
    [Authorize(UserRole.RESTAURANT)]
    public class RestaurantController : ControllerBase
    {
        private RestaurantService _restaurantService;

        public RestaurantController(RestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Restaurant res)
        {
            _restaurantService.register(res);
            return Ok();
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] UserVM res)
        {
            _restaurantService.Login(res);
            return Ok();
        }
    }
}
