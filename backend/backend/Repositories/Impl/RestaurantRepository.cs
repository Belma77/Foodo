using Data;
using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories.Impl
{
    public class RestaurantRepository:IRestaurantRepository
    {
        private MyContext _dbContext;
        public RestaurantRepository(MyContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void create(Restaurant restaurant)
        {
            this._dbContext.restaurants.Add(restaurant);
            this._dbContext.SaveChanges();
        }

        public List<Restaurant> GetAll()
        {
            return _dbContext.restaurants.ToList();
        }
    }
}
