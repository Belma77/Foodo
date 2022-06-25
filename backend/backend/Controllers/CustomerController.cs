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
using AuthorizeAttribute = backend.Filters.CustomAuthorizeAttribute;
using static backend.Utils.AuthConstants;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    [Route("customer")]
    
    [ApiController]
    [Authorize(UserRole.Customer)]
    public class CustomerController : ControllerBase
    {
        private CustomerService _customerService;
        private readonly OrderService orderService;
        private UserRepository us;
        

        public CustomerController(CustomerService customerService, OrderService orderService, UserRepository us,   IMapper _mapper)
        {
            _customerService = customerService;
            this.orderService = orderService;
            this.us = us;
           
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] CustomerVM customer)
        {
            _customerService.register(customer);
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ResponseToken Login([FromBody] UserVM customer)
        {
            ResponseToken token = _customerService.login(customer);
            Console.WriteLine($"Logiran { customer.email}");
            return token;
        }

        [HttpPost]
        [Route("order/create")]
<<<<<<< HEAD
        [Authorize(UserRole.Customer)]
=======
        [AllowAnonymous]
        //[Authorize]
>>>>>>> d32c5ca (added files for stripe integration)
        public IActionResult createOrder([FromBody] OrderViewModel order)
        {
            int userId = int.Parse(HttpContext.User.Identity.Name);
            orderService.createOrder(order, userId);
            return Ok();
        }
        [HttpPost]
        [Route("session/create")]
        [AllowAnonymous]
        //[Authorize]
        public IActionResult CreateSession([FromBody] OrderViewModel order)
        {
            orderService.CreateSession(order);
           var url= orderService.CreateSession(order);
            Response.Headers.Add("Location", url);
            return new StatusCodeResult(303);

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

        //[HttpGet]
        //[Route("doMe")]
        //[AllowAnonymous]
        //public ActionResult<User> doMe()
        //{

        //    try
        //    {
        //        var pathBase = HttpContext.Items;

        //        User user = (User)pathBase[USER_TYPED_KEY];
                
        //        //return Ok(_customerService.doMe(user));
        //        User u = us.doMe(user);
        //        return Ok(u); 
        //    }
        //    catch (Exception)
        //    {
        //        throw new Exception();
        //    }
        //}
        private UserDto getUserDto()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var claims = identity.Claims;
                return new UserDto
                {
                    //userName = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value,
                    email = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,

                    //role = claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value,
                };
            }
            return null;
        }
        
    }

}


        
        



