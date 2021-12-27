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

        public CourierController(CourierService courierService)
        {
            this._courierService = courierService;

        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Courier courier)
        {

            _courierService.Register(courier);
            return Ok();
        }
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] UserVM courier)
        {
            _courierService.Login(courier);

            return Ok();
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
