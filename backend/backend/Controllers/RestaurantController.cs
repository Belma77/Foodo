using AutoMapper;
using backend.Services;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;

namespace backend.Controllers
{
    [ApiController]
    [Route("restaurant")]
    [Authorize(UserRole.RESTAURANT)]
    public class RestaurantController : BaseUserController
    {
        private readonly IMapper _mapper;
        private readonly IProductService _productService;

        public RestaurantController(IMapper mapper, IUserService userService,
                                    IProductService productService): base(userService)
        {
            this._productService = productService;
            this._mapper = mapper;
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] Restaurant user)
        {
            userService.register(user);
            return Ok();
        }
    }
}
