using Data.Models.Entities;
using Data.Models.ViewModels;

namespace backend.Services.Interfaces
{
    public interface ICustomerService
    {
        void register(CustomerVM c);
        ResponseToken login(UserVM u);

    }
}
