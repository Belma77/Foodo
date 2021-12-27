using backend.Utils;
using Data;
using Data.Models.Dtos;
using Data.Models.Entities;
using Data.Models.ViewModels;
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
        
    }
}
