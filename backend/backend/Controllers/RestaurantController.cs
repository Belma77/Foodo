﻿using AutoMapper;
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
        private readonly IMapper _mapper;
        
        public RestaurantController(RestaurantService restaurantService, IMapper _mapper)
        {
            _restaurantService = restaurantService;
            this._mapper = _mapper;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RestaurantVM res)
        {
            _restaurantService.register(_mapper.Map<Restaurant>(res));
            return Ok(res);
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public ResponseToken Login([FromBody] UserVM res)
        {
            _restaurantService.Login(res);
            ResponseToken token = _restaurantService.Login(res);
            Console.WriteLine($"Logiran { res.email}");
            return token;
        }
    }
}
