using AutoMapper;
using backend.Services;
using backend.Services.Impl;
using backend.Services.Interfaces;
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
   // [Authorize(UserRole.Courier)]
    public class CourierController : ControllerBase
    {

        private readonly ICourierService _courierService;
        private IMapper mapper;
        private IUserService _userService;
        private IOrderService _orderService;
        public CourierController(ICourierService courierService, IMapper mapper, IUserService userService,IOrderService orderService)
        {
            this._courierService = courierService;
            this.mapper = mapper;
            this._userService = userService;
            this._orderService= orderService;

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
            ResponseToken token = _courierService.Login(courier);
            return token;
        }

        [HttpPatch]
        [Route("status/active")]
        [Authorize(UserRole.Courier)]
        public IActionResult setStatusActive()
        {
            
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            int courierId = int.Parse(userId);
            _courierService.setStatus(courierId, CourierWorkingStatus.ACTIVE);
            return Ok();
        }

        [HttpPatch]
        [Route("status/inactive")]
        [Authorize(UserRole.Courier)]
        public IActionResult setStatusInactive()
        {
            
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            int courierId = int.Parse(userId);
            _courierService.setStatus(courierId, CourierWorkingStatus.INACVTIVE);
            return Ok();
        }
        [HttpPatch]
        [Route("acceptOrder")]
        [Authorize(UserRole.Courier)]
        public IActionResult CourierAcceptOrder([FromBody] OrderViewModel order)
        {
            _courierService.courierAcceptOrder(order);
            return Ok();
        }
        


    }
}
