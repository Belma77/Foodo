using AutoMapper;
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
        private IUserRepository userRepository;
        private IMapper _mapper;
        public UserService(MyContext _dbContext, IUserRepository us, IMapper mapper)
        {
            this._dbContext = _dbContext;
            this.userRepository = us;
            _mapper = mapper;   
        }


        public IEnumerable<User> GetAll()
        {
            return _dbContext.users;
        }


        public UserDto doMe(int userId)
        {
            try
            {
                var user = userRepository.findById(userId);
                return _mapper.Map<UserDto>(user);
            }
            catch(Exception)
            {
                throw new DomainUnauthorizedException("User not found");
            }
            
        }
        
    }
}
