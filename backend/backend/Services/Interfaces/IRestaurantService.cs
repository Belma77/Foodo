using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace backend.Services.Interfaces
{
    public interface IRestaurantService
    {
        void register(Restaurant res);
        ResponseToken Login(UserVM u);
        List<RestaurantVM> GetRestaurants();
        RestaurantVM GetRestaurant(int id);
        void editProfile(int userId, IFormFile file, Restaurant r);

    }
}
