using backend.Services;
using backend.Services.Impl;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
        private readonly OrderService orderService;

        public CustomerController(IUserService userService, OrderService orderService)
        {
            this.userService = userService;
            this.orderService = orderService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Restaurant user)
        {
            userService.register(user);
            return Ok();
        }

        [HttpPost]
        [Route("order/create")]
        [AllowAnonymous]
        public IActionResult createOrder([FromBody] Order order)
        {
            Console.WriteLine(JsonSerializer.Serialize(order));
            //orderService.createOrder(order);
            return Ok();
        }
    }
}
