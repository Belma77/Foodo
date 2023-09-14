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
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [Route("customer")]
    [ApiController]
    [Authorize(UserRole.Customer)]
    public class CustomerController : ControllerBase
    {
<<<<<<< HEAD
        private ICustomerService _customerService;
        private readonly IOrderService orderService;
        

        public CustomerController(ICustomerService customerService, IOrderService orderService, IMapper _mapper)
=======
        private CustomerService _customerService;
        private readonly OrderService orderService;
        private IUserRepository us;
        

        public CustomerController(CustomerService customerService, OrderService orderService, IUserRepository us,   IMapper _mapper)
>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)
        {
            _customerService = customerService;
            this.orderService = orderService;
           
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
        [Route("session/create")]
        [AllowAnonymous]
        //[Authorize]
        public void CreateSession([FromBody] OrderViewModel order)
        {
            var url = "localhost:4200";
            string userId = HttpContext.User.Identity.Name;
            int customerId = int.Parse(userId);
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
            catch(Exception ex)
            {
                throw ex;
            }

        }

        
        
    }

}


        
        



