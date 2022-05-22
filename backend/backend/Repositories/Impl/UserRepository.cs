using backend.Utils;
using Data;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private MyContext dbContext;

        public UserRepository(MyContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<User> getAll(UserRole userRole)
        {
            return dbContext.users.Where(user => userRole == user.role).ToList();
        }

        public void create (User user)
        {
            dbContext.users.Add(user);
            dbContext.SaveChanges();
        }
       
        public User findById (int id)
        {
            User user = dbContext.users.Find(id);
            return user;
        }

        public User findByEmail(string email)
        {
            User user = dbContext.users.FirstOrDefault(u => u.email == email);
            return user;
        }

        public void update (User user)
        {
            dbContext.users.Update(user);
            dbContext.SaveChanges();
        }

        public Restaurant findRestaurantById(int id)
        {
            return dbContext.restaurants.Include(r => r.Products).ThenInclude(p => p.Category).Where(r => r.Id == id).FirstOrDefault();
        }
    }
}
