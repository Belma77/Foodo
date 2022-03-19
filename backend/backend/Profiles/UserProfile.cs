using AutoMapper;
using Data.Models.Dtos;
using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Restaurant, UserDto>();
            CreateMap<UserDto, Restaurant>();
            CreateMap<User, UserDto>();
            CreateMap<Courier, UserDto>();
            CreateMap<Customer, UserDto>();
        }
    }
}
