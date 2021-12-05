using backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Text.Json;
using static backend.Utils.AuthConstants;

namespace backend.interceptors
{
    public class AuthFilter : Attribute, IAuthorizationFilter
    {

        
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.Request.Headers.ContainsKey("Authorization"))
            {
                string bearer = context.HttpContext.Request.Headers["Authorization"];
                string token = bearer.Substring(7, bearer.Length-7);
                if (JwtUtil.IsTokenValid(token))
                {
                    var user = JwtUtil.getUserFromToken(token);
                    context.HttpContext.Request.Headers.Add(USER_TYPED_KEY, JsonSerializer.Serialize(user));
                    return;
                }
                else
                {
                    throw new Exception("Unauthorized");
                }
            }
            else
            {
                throw new Exception("Unauthorized");
            }
        }
    }
}
