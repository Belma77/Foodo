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
            _dbContext.ChangeTracker.Clear();
            return _dbContext.orders.Where(o => o.Id == id)
                                    .Include(o => o.OrderRecords)
                                    .Include(o => o.Customer)
                                    .FirstOrDefault(); ;
        }

        public Order create (Order order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return order;
        }

        public void update (Order order)
        {
            _dbContext.orders.Update(order);
            _dbContext.SaveChanges();
        }
    }
}
