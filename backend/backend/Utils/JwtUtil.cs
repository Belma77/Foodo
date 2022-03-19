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
            new Claim(ClaimTypes.Role, JsonSerializer.Serialize(user.role)),
            new Claim(ClaimTypes.Email, JsonSerializer.Serialize(user.email)),
            new Claim(ClaimTypes.Name, JsonSerializer.Serialize(user.userName)),
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

        public static Restaurant getUserFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var payload = tokenHandler.ReadJwtToken(token).Payload;
            Restaurant user = JsonSerializer.Deserialize<Restaurant>(payload.Claims.First(c => c.Type == USER_TYPED_KEY).Value);

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
