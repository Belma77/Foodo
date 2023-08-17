using Data.Models.Entities;
using System.Linq;

namespace backend.Repositories
{
    public interface IOrderRepository
    {
        Order findById(int id);
        Order create(Order order);
        void update(Order order);
        public Order GetLatest();
        IQueryable<Order> GetCompletedOrders(int courierId);


    }
}
