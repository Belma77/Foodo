using Data.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace backend.Repositories
{
    public interface IOrderRepository
    {
        Order findById(int id);
        Order create(Order order);
        void update(Order order);
        public Order GetLatest(int userId);
        public Order GetActive(int courierId);
        IQueryable<Order> GetCompletedOrders(int courierId);

        List<Order> getPendingAndActive(int restaurntId);
    }
}
