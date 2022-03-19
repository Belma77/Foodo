using Data;
using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories.Impl
{
    public class RestaurantRepository
    {
        private MyContext dbContext;
        public void create(Restaurant restaurant)
        {
            this.dbContext.restaurants.Add(restaurant);
            this.dbContext.SaveChanges();
        }
    }
}
