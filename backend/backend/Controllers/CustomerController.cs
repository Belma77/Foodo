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
using Stripe.Checkout;
using Newtonsoft.Json;

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
        public void CreateSession([FromBody] OrderViewModel order)
        {
            var url = "localhost:4200";
            try
            {
                var options = new SessionCreateOptions
                {
                    LineItems = orderService.CreatesessionLineItemOptions(order),

                    Mode = "payment",
                    SuccessUrl = "http://localhost:4200/checkout",
                    CancelUrl = "http://localhost:4200/cancel",
                };

                var service = new SessionService();
                Session session = service.Create(options);
                Response.Headers.Add("Location", session.Url);
                Response.WriteAsJsonAsync(session.Url);
                
            }
            catch(Exception)
            {
              throw new Exception();
            }

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
<<<<<<< HEAD

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
=======
>>>>>>> b18f049 (task-20 implemented online payment with stripe integration)
        
    }

}


        
        



