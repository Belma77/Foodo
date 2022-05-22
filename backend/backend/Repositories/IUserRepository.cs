using Data.Models.Entities;
using Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        public List<User> getAll(UserRole userRole);

        public void create(User user);

        public User findById(int id);

        public User findByEmail(string email);

        public void update(User user);

        public Restaurant findRestaurantById(int id);
    }
}
