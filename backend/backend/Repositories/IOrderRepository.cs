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
<<<<<<< HEAD
        public Order GetLatest(int userId);
=======
        public Order GetActive(int courierId);
>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)
        IQueryable<Order> GetCompletedOrders(int courierId);

        List<Order> getPendingAndActive(int restaurntId);
    }
}
