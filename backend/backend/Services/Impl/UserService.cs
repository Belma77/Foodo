using backend.ErrorHandler;
using backend.Repositories;
using backend.Utils;
using Data;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Impl
{
    public class UserService
    {
        private MyContext _dbContext;
        private UserRepository userRepository;
        public UserService(MyContext _dbContext, UserRepository us)
        {
            this._dbContext = _dbContext;
            this.userRepository = us;
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
        public User doMe(User u)
        {
            try
            {
                var user = userRepository.findById(u.Id);
                return user;
            }
            catch(Exception)
            {
                throw new DomainUnauthorizedException("User not found");
            }
            
        }
    }
}
