using Data.Models.ViewModels;
using System.Collections.Generic;

namespace backend.Services.Interfaces
{
    public interface ILocationService
    {
        void AddCustomerLocation(LocationDto location, int customerId);
        List<LocationDto> Get(int CustomerId);
        void Update(LocationDto update, int CustomerId);

    }
}
