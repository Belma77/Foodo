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
            CreateMap<UserDto, RestaurantVM>();

            CreateMap<Courier, UserDto>();
            CreateMap<CourierVM, Courier>();
            CreateMap<Courier, CourierVM>();
            CreateMap<Courier, GetCourierVM>();

            CreateMap<Customer, UserDto>();
            CreateMap<Customer, CustomerVM>();
            CreateMap<Customer, GetCustomerVM>();

            CreateMap<Restaurant, User>();
            CreateMap<Restaurant, UserDto>();
            CreateMap<RestaurantVM, Restaurant>();
            CreateMap<Restaurant, RestaurantVM>();
            CreateMap<Restaurant, GetRestaurantVM>();

            
            CreateMap<ReviewsVM, Reviews>();

            CreateMap<Order, GetLatestOrderVM>();
            CreateMap<Order, GetOrdersVM>();
            CreateMap<Order, OrderViewModel>();
            CreateMap<OrderViewModel, Order>();
            CreateMap<OrderRecord, OrderRecordViewModel>();
            CreateMap<OrderRecordViewModel, OrderRecord>();

            CreateMap<Product, ProductViewModel>();
            CreateMap<ProductViewModel, Product>();

            CreateMap<Category, CategoryVM>();
            CreateMap<CategoryVM, Category>();

            CreateMap<Location, GetFormattedAdress>();
            CreateMap<Location, LocationDto>();
            CreateMap<LocationDto, Location>();
        }
    }
}
