using AutoMapper;
using backend.Services;
using backend.Services.Impl;
using backend.Utils;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.CustomAuthorizeAttribute;

namespace backend.Controllers
{
    [Route("courier")]
    [ApiController]
    [Authorize(UserRole.Courier)]
    public class CourierController : ControllerBase
    {

        private readonly CourierService _courierService;
        private IMapper mapper;
        private UserService _userService; 

        public CourierController(CourierService courierService, IMapper mapper, UserService userService)
        {
            this._courierService = courierService;
            this.mapper = mapper;
            this._userService = userService;

        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] CourierVM courier)
        {

            _courierService.Register(mapper.Map<Courier>(courier));
            return Ok();
        }
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ResponseToken Login([FromBody] UserVM courier)
        {
            _courierService.Login(courier);
            ResponseToken token = _courierService.Login(courier);
            Console.WriteLine($"Logiran { courier.email}");
            return token;
        }

        [HttpPatch]
        [Route("status/active")]
        [AllowAnonymous]
        public IActionResult setStatusActive()
        {
            //Todo get courier from jwt
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            int courierId = int.Parse(userId);
            Console.WriteLine(courierId);
            _courierService.setStatus(courierId, CourierWorkingStatus.ACTIVE);
            return Ok();
        }

        [HttpPatch]
        [Route("status/inactive")]
        [AllowAnonymous]
        public IActionResult setStatusInactive()
        {
            //Todo get courier from jwt
            //int courierId = 1;
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            int courierId = int.Parse(userId);
            _courierService.setStatus(courierId, CourierWorkingStatus.INACVTIVE);
            return Ok();
        }
        [HttpPatch]
        [Route("acceptOrder")]
        [AllowAnonymous]
        public IActionResult CourierAcceptOrder([FromBody] Order order)
        {
            _courierService.courierAcceptOrder(order);
            return Ok();
        }

    }
}
