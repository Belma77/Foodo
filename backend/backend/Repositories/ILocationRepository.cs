using Data.Models.Entities;
using Data.Models.ViewModels;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Collections.Generic;

namespace backend.Repositories
{
    public interface ILocationRepository
    {
         void Add(Location location);
         void Update(Location location);
         List<Location> GetByCustomer(int CustomerId);
         Location GetCurrent(int CustomerId);
         Location Get(Location location, int customerId);
        Location GetById(int id);

    }
}
