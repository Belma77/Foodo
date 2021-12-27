using Data.Models.Dtos;
using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Enums
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserDto user, string token)
        {
            Id = user.Id;
            email = user.email;
            password = user.password;
            Token = token;
        }
    }
}
