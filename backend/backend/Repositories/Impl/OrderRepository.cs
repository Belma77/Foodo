using Data;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Repositories.Impl
{
    public class OrderRepository:IOrderRepository
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
                                        .ThenInclude(c=>c.Category)
                                    .Include(o => o.Customer)
                                    .Include(o=>o.Restaurant)
                                    .Include(o=>o.customerLocation)
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
        public Order GetLatest(int userId)
        {
            return _dbContext.orders
               .Where(x => x.Customer.Id == userId)
               .Include(x => x.Restaurant)
               .Include(x => x.Courier)
               .Include(x => x.OrderRecords)
               .FirstOrDefault();
        }

        public Order GetActive(int courierId)
        {
            var order = _dbContext.orders
                .Where(x => x.Courier.Id == courierId && (x.orderStatus == OrderStatus.IN_PREPARATION || x.orderStatus == OrderStatus.PICKED_UP || x.orderStatus == OrderStatus.DELIVERING))
                .Include(x => x.Restaurant)
                .Include(x => x.Courier)
                .Include(x => x.Customer)
                .Include(x => x.OrderRecords)
                .FirstOrDefault();
            return order;
        }
        public IQueryable<Order> GetCompletedOrders(int courierId)
        {
            return _dbContext.orders
                .Where(x => x.orderStatus == Data.Models.Enums.OrderStatus.COMPLETED)
                .Include(x => x.OrderRecords).ThenInclude(x=>x.Product)
                .Include(x => x.Restaurant)
                .Include(x => x.Customer)
                .Include(x => x.Courier).Where(x => x.Courier.Id == courierId)
                .Include(x=>x.customerLocation)
                .AsQueryable();
        }

        public List<Order> getPendingAndActive(int resturantId)
        {
            return _dbContext.orders
                .Where(o => o.orderStatus==OrderStatus.CREATED || o.orderStatus == OrderStatus.IN_PREPARATION && o.Restaurant.Id==resturantId)
                .Include(o => o.OrderRecords)
                    .ThenInclude(o => o.Product)
                .ToList();
        }
    }
}
