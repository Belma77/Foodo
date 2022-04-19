﻿using AutoMapper;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.ViewModels;
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
            CreateMap<Restaurant, User>();
            CreateMap<RestaurantVM, Restaurant>();
            CreateMap<CourierVM, Courier>();

        }
    }
}
