using backend.Services;
using backend.Services.Impl;
using Data;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Data.Models.ViewModels;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;
using static backend.Utils.AuthConstants;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("customer")]
    [ApiController]
    [Authorize(UserRole.CUSTOMER)]
    public class CustomerController : ControllerBase
    {
        private CustomerService _customerService;
        private readonly OrderService orderService;
        private UserRepository us;
        
        public CustomerController(CustomerService customerService, OrderService orderService, UserRepository us)
        {
            _customerService = customerService;
            this.orderService = orderService;
            this.us = us;
           
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
            Console.WriteLine($"Logiran { customer.email}");

            return token;
        }

        [HttpPost]
        [Route("order/create")]
        //[AllowAnonymous]
        [Authorize]
        public IActionResult createOrder([FromBody] OrderViewModel order)
        {
            orderService.createOrder(order);
            return Ok();
        }

        [HttpGet]
        [Route("order/{id}")]
        //[AllowAnonymous]
        [Authorize]
        public IActionResult getOrder([FromRoute] int id)
        {
            Order order = orderService.GetOrder(id);
            return Ok(order);
            //return Ok(JsonSerializer.Serialize());
        }

        [HttpGet]
        [Route("doMe")]
        [AllowAnonymous]
        public ActionResult<User> doMe()
        {

            try
            {
                var pathBase = HttpContext.Items;

                User user = (User)pathBase[USER_TYPED_KEY];
                
                //return Ok(_customerService.doMe(user));
                User u = _customerService.doMe(user);
                return Ok(u); 
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
        private UserDto getUserDto()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var claims = identity.Claims;
                return new UserDto
                {
                    userName = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value,
                    email = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,

                    //role = claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value,
                };
            }
            return null;
        }
        
    }

}


        
        



