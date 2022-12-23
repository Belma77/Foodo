using AutoMapper;
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
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;

using AuthorizeAttribute = backend.Filters.CustomAuthorizeAttribute;

namespace backend.Controllers
{
    [ApiController]
    [Route("restaurant")]
    [Authorize(UserRole.Restaurant)]
    public class RestaurantController : ControllerBase
    {
        private RestaurantService _restaurantService;
        private readonly IMapper _mapper;
        private OrderService orderService;
        
        public RestaurantController(RestaurantService restaurantService, IMapper _mapper, OrderService orderService)
        {
            _restaurantService = restaurantService;
            this._mapper = _mapper;
            this.orderService = orderService;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RestaurantVM res)
        {
            _restaurantService.register(_mapper.Map<Restaurant>(res));
            return Ok(res);
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public ResponseToken Login([FromBody] UserVM res)
        {
            _restaurantService.Login(res);
            ResponseToken token = _restaurantService.Login(res);
            Console.WriteLine($"Logiran { res.email}");
            return token;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult getRestaurants()
        {
            var res = _restaurantService.GetRestaurants();
            return Ok(_restaurantService.GetRestaurants());
        }

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public IActionResult getRestaurant(int id)
        {
            return Ok(_restaurantService.GetRestaurant(id));
        }

        [HttpPut]
        [Route("profile")]
        public IActionResult editProfile([FromForm] IFormFile file, [FromForm] string body)
        {
            var userId = HttpContext.User.Identity.Name;
            Restaurant r = JsonConvert.DeserializeObject<Restaurant>(body);
            _restaurantService.editProfile(int.Parse(userId), file, r);
            return Ok();
        }

        [HttpPatch]
        [Route("accept/order")]
        [AllowAnonymous]
        public IActionResult resAcceptOrder([FromBody] Order order)
        {
            orderService.restaurantAcceptOrder(order);
            Console.WriteLine("restoran prihvatio narudzbu");
            return Ok();
        }
    }
}
