using Data;
using Data.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories.Impl
{
    public class OrderRepository
    {
        private MyContext _dbContext;

        public OrderRepository(MyContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Order findById(int id)
        {
            Order o = this._dbContext.orders.Where(o => o.Id == id)
                                            .FirstOrDefault();
            return o;
        }

        public void create (Order order)
        {
            _dbContext.Add(order);
            _dbContext.SaveChanges();
        }

        public void update (Order order)
        {
            _dbContext.orders.Update(order);
            _dbContext.SaveChanges();
        }
    }
}
