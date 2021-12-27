using backend.Services;
using backend.Services.Impl;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models.ViewModels;

using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

namespace backend.Controllers
{
    [Route("customer")]
    [ApiController]
    [Authorize(UserRole.CUSTOMER)]
    public class CustomerController : ControllerBase
    {
        private CustomerService _customerService;
        private readonly OrderService orderService;

        public CustomerController(CustomerService customerService, OrderService orderService, UserService us)
        {
            _customerService = customerService;
            this.orderService = orderService;
            
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Customer customer)
        {
            _customerService.register(customer);
            return Ok();
        }
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ResponseToken Login([FromBody] UserVM customer)
        {
            _customerService.login(customer);
            ResponseToken token = _customerService.login(customer);
            return token;
        }

        [HttpPost]
        [Route("order/create")]
        [AllowAnonymous]
        public IActionResult createOrder([FromBody] OrderViewModel order)
        {
            orderService.createOrder(order);
            return Ok();
        }

        [HttpGet]
        [Route("order/{id}")]
        [AllowAnonymous]
        public IActionResult getOrder([FromRoute] int id)
        {
            Order order = orderService.GetOrder(id);
            return Ok(order);
            //return Ok(JsonSerializer.Serialize());
        }
    }
}
