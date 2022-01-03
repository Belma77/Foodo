using Data;
using Data.Models.Entities;
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
            return this._dbContext.orders.Find(id);
        }

        public void create (Order order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
        }

        public void update (Order order)
        {
            _dbContext.orders.Update(order);
            _dbContext.SaveChanges();
        }
    }
}
