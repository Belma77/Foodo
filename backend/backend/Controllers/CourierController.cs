using AutoMapper;
using backend.Services;
using backend.Services.Impl;
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
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

namespace backend.Controllers
{
    [Route("courier")]
    [ApiController]
    [Authorize(UserRole.COURIER)]
    public class CourierController : ControllerBase
    {

        private readonly CourierService _courierService;
        private IMapper mapper;

        public CourierController(CourierService courierService, IMapper mapper)
        {
            this._courierService = courierService;
            this.mapper = mapper;

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
            int courierId = 1;
            _courierService.setStatus(courierId, CourierWorkingStatus.ACTIVE);
            return Ok();
        }

        [HttpPatch]
        [Route("status/inactive")]
        [AllowAnonymous]
        public IActionResult setStatusInactive()
        {
            //Todo get courier from jwt
            int courierId = 1;
            _courierService.setStatus(courierId, CourierWorkingStatus.INACVTIVE);
            return Ok();
        }

    }
}
