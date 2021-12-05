using Data.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IUserService
    {
        public void register(User user);

        public string login(User user);

    }
}
