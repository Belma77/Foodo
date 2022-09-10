using backend.Services.Impl;
using backend.Utils;
using Data.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;

namespace backend.middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private UserService _userService;
        public JwtMiddleware(RequestDelegate next, UserService userService)
        {
            _next = next;
            _userService = userService;
            
        }

        public async Task Invoke(HttpContext context)
        {
            var request = context.Request;

            if (request.Path.StartsWithSegments("/hub", StringComparison.OrdinalIgnoreCase) &&
              request.Query.TryGetValue("access_token", out var accessToken))
            {
                Console.WriteLine(accessToken);
                request.Headers.Add("Authorization", $"Bearer {accessToken}");
            }

            var token = request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                if (JwtUtil.IsTokenValid(token))
                {
                    var user = JwtUtil.getUserFromToken(token);
                    context.Items[USER_TYPED_KEY] = user;
                    
                }
            }

            await _next(context);
          
        }
        

    }

}
