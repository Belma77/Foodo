using backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;

namespace backend.middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (JwtUtil.IsTokenValid(token))
            {
                var user = JwtUtil.getUserFromToken(token);
                context.Items[USER_TYPED_KEY] = user;
            }

            await _next(context);
          
        }

    }

}
