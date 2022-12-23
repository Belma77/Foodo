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
                                        .ThenInclude(or => or.Product)
                                    .Include(o => o.Customer)
                                    .Include(o=>o.Restaurant)
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
        public Order GetLatest()
        {
            int userId = 1;
            return _dbContext.orders
                .Where(x => x.Customer.Id == userId)
                .Include(x=>x.Restaurant)
                .Include(x=>x.Courier)
                .OrderByDescending(x => x.Id)
                .FirstOrDefault();
        }
        public IQueryable<Order> GetCompletedOrders(int courierId)
        {
            return _dbContext.orders
                .Where(x => x.orderStatus == Data.Models.Enums.OrderStatus.COMPLETED)
                .Include(x => x.OrderRecords).ThenInclude(x=>x.Product)
                .Include(x => x.Restaurant)
                .Include(x => x.Customer)
                .Include(x => x.Courier).Where(x => x.Courier.Id == courierId)
                .AsQueryable();
        }
    }
}
