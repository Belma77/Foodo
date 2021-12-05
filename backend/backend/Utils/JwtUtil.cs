using Data.Models.Dtos;
using Data.Models.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static backend.Utils.AuthConstants;

namespace backend.Utils
{
    public static class JwtUtil
    {

        public static string generateToken(UserDto user)
        {
            var claims = new[] {
            new Claim(nameof (user), JsonSerializer.Serialize(user)),
            new Claim(ClaimTypes.NameIdentifier,
            Guid.NewGuid().ToString())
        };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(null, null, claims,
                expires: DateTime.Now.AddDays(30), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        public static bool IsTokenValid(string token)
        {
            var mySecret = Encoding.UTF8.GetBytes(KEY);
            var mySecurityKey = new SymmetricSecurityKey(mySecret);
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = mySecurityKey,
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        public static User getUserFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var payload = tokenHandler.ReadJwtToken(token).Payload;
            User user = JsonSerializer.Deserialize<User>(payload.Claims.First(c => c.Type == USER_TYPED_KEY).Value);

            if(user != null)
            {
                return user;
            }
            else
            {
                throw new Exception("Unable to get User information");
            }
        }
    }
}
