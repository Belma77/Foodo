using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IRestaurantRepository
    {
        public void create(Restaurant restaurant);
        List<Restaurant> GetAll();
    }
}
