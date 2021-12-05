using AutoMapper;
using backend.interceptors;
using Data.Models.Dtos;
using Data.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;

namespace backend.Controllers
{
    [ApiController]
    [Route("restaurant")]
    public class RestaurantController : Controller
    {
        private readonly IMapper _mapper;

        public RestaurantController(IMapper mapper)
        {
            this._mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        [AuthFilter]
        public IActionResult Login()
        {
            User user = JsonSerializer.Deserialize<User>(Request.Headers[USER_TYPED_KEY]);
            UserDto userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }
    }
}
