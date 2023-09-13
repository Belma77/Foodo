using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.ViewModels;

namespace backend.Services.Interfaces
{
    public interface ICourierService
    {
        void Register(Courier courier);
        ResponseToken Login(UserVM u);
        void sendOrderOffer(int orderId);
        void setStatus(int courierId, CourierWorkingStatus status);
        void courierAcceptOrder(OrderViewModel order);
    }
}
