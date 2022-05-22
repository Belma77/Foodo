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


        public IEnumerable<User> GetAll()
        {
            return _dbContext.users;
        }


        public User doMe(int userId)
        {
            try
            {
                var user = userRepository.findById(userId);
                return user;
            }
            catch(Exception)
            {
                throw new DomainUnauthorizedException("User not found");
            }
            
        }
    }
}
