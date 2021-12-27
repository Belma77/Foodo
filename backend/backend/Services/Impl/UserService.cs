using backend.Utils;
using Data;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class UserService
    {
        private MyContext _dbContext;
        public UserService(MyContext _dbContext)
        {
            this._dbContext = _dbContext;
        }
        public AuthenticateResponse Login(UserDto model)
        {
            var user = (UserDto)_dbContext.users.SingleOrDefault(x => x.email == model.email && x.password == model.password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = JwtUtil.generateToken(user);

            return new AuthenticateResponse(user, token);

        }


        public IEnumerable<User> GetAll()
        {
            return _dbContext.users;
        }
    }
}
