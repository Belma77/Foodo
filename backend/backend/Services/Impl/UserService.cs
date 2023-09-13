using AutoMapper;
using backend.ErrorHandler;
using backend.Repositories;
using backend.Services.Interfaces;
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
    public class UserService:IUserService
    {
        private IUserRepository userRepository;
        private IMapper _mapper;
        public UserService( IUserRepository us, IMapper mapper)
        {
            this.userRepository = us;
            _mapper = mapper;   
        }

        public UserDto doMe(int userId)
        {
            try
            {
                var user = userRepository.findById(userId);
                var dto= _mapper.Map<UserDto>(user);
                return dto;
            }
            catch(Exception)
            {
                throw new DomainUnauthorizedException("User not found");
            }
            
        }
        
    }
}
