using AutoMapper;
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
            CreateMap<User, UserDto>();
            CreateMap<User, Restaurant>();

            CreateMap<Courier, UserDto>();
            CreateMap<Customer, UserDto>();
            CreateMap<Restaurant, User>();
            CreateMap<RestaurantVM, Restaurant>();
            CreateMap<Restaurant, RestaurantVM>();

            CreateMap<CourierVM, Courier>();
            CreateMap<CourierVM, Courier>();
            CreateMap<ReviewsVM, Reviews>();
            CreateMap<Order, GetLatestOrderVM>();
            CreateMap<Order, GetOrdersVM>();
            CreateMap<Restaurant, GetRestaurantVM>();
            CreateMap<Courier, GetCourierVM>();
            CreateMap<OrderRecord, OrderRecordViewModel>();
            CreateMap<Product, ProductViewModel>();

        }
    }
}
