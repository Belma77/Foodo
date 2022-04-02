using backend.Filters;
using backend.Services.Impl;
using backend.Utils;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AuthorizeAttribute = backend.Filters.AuthorizeAttribute;
using static backend.Utils.AuthConstants;
namespace backend.Controllers
{
    
        [ApiController]
        [Route("user")]
        public class UsersController : ControllerBase
        {
            private UserService _userService;

            public UsersController(UserService userService)
            {
                _userService = userService;
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
                User u = _userService.doMe(user);
                return Ok(u);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }
        [AllowAnonymous]
            [HttpPost("Login")]
            public IActionResult Authenticate([FromBody] UserDto model)
            {
                var user = _userService.Login(model);

                if (user == null)
                    return BadRequest(new { message = "Username or password is incorrect" });

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(AuthConstants.KEY);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // return basic user info and authentication token
                return Ok(new
                {
                    Id = user.Id,
                    email = user.email,
                    password = user.password,
                    Token = tokenString
                });
            }

        //[Authorize]
        //[HttpGet]
        //public IActionResult GetAll()
        //{
        //    var users = _userService.GetAll();
        //    return Ok(users);
        //}
        //    [Authorize]
        //    [HttpGet]
        //    public IActionResult GetUser()
        //    {
        //        var user = getUserDto();
        //        return Ok();
        //    }
        //    private UserDto getUserDto()
        //    {
        //        var identity = HttpContext.User.Identity as ClaimsIdentity;
        //        if (identity != null)
        //        {
        //            var claims = identity.Claims;
        //            return new UserDto
        //            {
        //                userName = claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
        //                email = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
        //                //role = claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value,
        //            };
        //        }
        //        return null;
        //    }
    }
}

